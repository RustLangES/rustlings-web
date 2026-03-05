import type { APIRoute } from "astro"
import { generateId } from "~/lib/auth/crypto"

export const POST: APIRoute = async ({ request, locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	let body: { courseId?: string; nameUsed?: string }
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
	}

	const { courseId, nameUsed } = body
	if (!courseId || !nameUsed?.trim()) {
		return new Response(JSON.stringify({ error: "Missing courseId or nameUsed" }), { status: 400 })
	}

	const { DB } = locals.runtime.env
	const now = new Date().toISOString()
	const id = generateId()

	await DB.prepare(
		`INSERT INTO user_certificates (id, user_id, course_id, name_used, issued_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (user_id, course_id) DO UPDATE SET
       name_used = excluded.name_used`,
	)
		.bind(id, user.id, courseId, nameUsed.trim(), now)
		.run()

	// Return the actual cert ID (may differ from `id` if there was a conflict)
	const row = await DB.prepare(
		"SELECT id, issued_at FROM user_certificates WHERE user_id = ? AND course_id = ?",
	)
		.bind(user.id, courseId)
		.first<{ id: string; issued_at: string }>()

	return new Response(JSON.stringify({ ok: true, certId: row?.id, issuedAt: row?.issued_at }), { status: 200 })
}

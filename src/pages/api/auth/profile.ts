import type { APIRoute } from "astro"

export const PATCH: APIRoute = async ({ request, locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	let body: { fullName?: string }
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
	}

	const fullName = body.fullName?.trim() ?? ""
	if (fullName.length > 80) {
		return new Response(JSON.stringify({ error: "Nombre demasiado largo" }), { status: 400 })
	}

	const { DB } = locals.runtime.env

	const row = await DB.prepare("SELECT full_name_locked FROM users WHERE id = ?")
		.bind(user.id)
		.first<{ full_name_locked: number }>()

	if (row?.full_name_locked) {
		return new Response(
			JSON.stringify({ error: "El nombre ya fue modificado y no puede cambiarse nuevamente" }),
			{ status: 403 },
		)
	}

	const now = new Date().toISOString()
	await DB.prepare(
		"UPDATE users SET full_name = ?, full_name_locked = 1, updated_at = ? WHERE id = ?",
	)
		.bind(fullName || null, now, user.id)
		.run()

	return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

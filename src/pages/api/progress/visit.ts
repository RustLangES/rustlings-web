import type { APIRoute } from "astro"
import { updateLastLesson } from "~/lib/progress-db"

export const POST: APIRoute = async ({ request, locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	let body: { courseId?: string; slug?: string }
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
	}

	const { courseId, slug } = body
	if (!courseId || !slug) {
		return new Response(JSON.stringify({ error: "Missing courseId or slug" }), { status: 400 })
	}

	const { DB } = locals.runtime.env
	await updateLastLesson(DB, user.id, courseId, slug)

	return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

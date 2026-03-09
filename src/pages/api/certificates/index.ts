import type { APIRoute } from "astro"

interface CertRow {
	course_id: string
	name_used: string
	issued_at: string
}

export const GET: APIRoute = async ({ locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	const { DB } = locals.runtime.env
	const { results } = await DB.prepare(
		"SELECT course_id, name_used, issued_at FROM user_certificates WHERE user_id = ? ORDER BY issued_at DESC",
	)
		.bind(user.id)
		.all<CertRow>()

	return new Response(JSON.stringify({ certificates: results }), { status: 200 })
}

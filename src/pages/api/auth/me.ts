import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	const { DB } = locals.runtime.env
	const row = await DB.prepare("SELECT full_name FROM users WHERE id = ?").bind(user.id).first<{ full_name: string | null }>()

	return new Response(
		JSON.stringify({
			id: user.id,
			email: user.email,
			username: user.username,
			fullName: row?.full_name ?? null,
		}),
		{ status: 200 },
	)
}

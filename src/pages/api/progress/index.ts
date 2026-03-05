import type { APIRoute } from "astro"
import { getUserProgress } from "~/lib/progress-db"

export const GET: APIRoute = async ({ locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	const { DB } = locals.runtime.env
	const progress = await getUserProgress(DB, user.id)

	return new Response(JSON.stringify({ progress }), { status: 200 })
}

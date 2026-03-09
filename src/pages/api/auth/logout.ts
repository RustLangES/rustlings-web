import type { APIRoute } from "astro"
import { deleteSession, SESSION_COOKIE } from "~/lib/auth/session"

async function logout({ locals, cookies }: Parameters<APIRoute>[0]) {
	const token = cookies.get(SESSION_COOKIE)?.value
	if (token) {
		await deleteSession(locals.runtime.env.DB, token)
	}
	cookies.delete(SESSION_COOKIE, { path: "/" })
	return new Response(null, { status: 302, headers: { Location: "/" } })
}

export const GET: APIRoute = logout
export const POST: APIRoute = logout

import type { APIRoute } from "astro"
import { generateToken } from "~/lib/auth/crypto"

export const GET: APIRoute = async ({ url, locals, cookies, redirect }) => {
	const { GITHUB_CLIENT_ID } = locals.runtime.env
	const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1"

	const state = generateToken()
	cookies.set("oauth_state", state, {
		httpOnly: true,
		secure: !isLocalhost,
		sameSite: "lax",
		path: "/",
		maxAge: 600,
	})

	const params = new URLSearchParams({
		client_id: GITHUB_CLIENT_ID,
		scope: "user:email",
		state,
	})

	return redirect(`https://github.com/login/oauth/authorize?${params}`)
}

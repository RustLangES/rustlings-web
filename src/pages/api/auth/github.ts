import type { APIRoute } from "astro"
import { generateToken } from "~/lib/auth/crypto"

export const GET: APIRoute = async ({ url, locals, cookies, redirect }) => {
	const { GH_CLIENT_ID } = locals.runtime.env
	const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1"

	const lang = url.searchParams.get("lang") ?? "es"
	const cookieOptions = {
		httpOnly: true,
		secure: !isLocalhost,
		sameSite: "lax" as const,
		path: "/",
		maxAge: 600,
	}

	const state = generateToken()
	cookies.set("oauth_state", state, cookieOptions)
	cookies.set("oauth_lang", lang, cookieOptions)

	const params = new URLSearchParams({
		client_id: GH_CLIENT_ID,
		scope: "user:email",
		state,
	})

	return redirect(`https://github.com/login/oauth/authorize?${params}`)
}

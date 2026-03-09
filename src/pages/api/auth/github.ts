import type { APIRoute } from "astro"
import { generateToken } from "~/lib/auth/crypto"

export const GET: APIRoute = async ({ url, locals, redirect }) => {
	const { GH_CLIENT_ID, DB } = locals.runtime.env

	const lang = url.searchParams.get("lang") ?? "es"
	const state = generateToken()
	const now = Math.floor(Date.now() / 1000)

	await DB.prepare("INSERT INTO oauth_states (state, lang, created_at) VALUES (?, ?, ?)").bind(state, lang, now).run()

	const params = new URLSearchParams({
		client_id: GH_CLIENT_ID,
		scope: "user:email",
		state,
	})

	return redirect(`https://github.com/login/oauth/authorize?${params}`)
}

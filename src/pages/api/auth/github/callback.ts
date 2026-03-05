import type { APIRoute } from "astro"
import { createUser, getUserByOAuth, linkOAuthAccount } from "~/lib/auth/db"
import { createSession, SESSION_COOKIE, sessionCookieOptions } from "~/lib/auth/session"

interface GitHubUser {
	id: number
	login: string
	name: string | null
	email: string | null
}

interface GitHubEmail {
	email: string
	primary: boolean
	verified: boolean
}

export const GET: APIRoute = async ({ url, locals, cookies, redirect }) => {
	const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, DB } = locals.runtime.env

	const code = url.searchParams.get("code")
	const state = url.searchParams.get("state")
	const storedState = cookies.get("oauth_state")?.value

	cookies.delete("oauth_state", { path: "/" })

	if (!code || !state || state !== storedState) {
		return redirect("/login?error=oauth_invalid")
	}

	// Intercambiar code por access_token
	const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: { Accept: "application/json", "Content-Type": "application/json" },
		body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
	})

	let tokenData: { access_token?: string; error?: string }
	try {
		tokenData = await tokenRes.json()
	} catch {
		return redirect("/login?error=oauth_token")
	}

	if (!tokenData.access_token) {
		return redirect("/login?error=oauth_token")
	}

	const accessToken = tokenData.access_token
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		Accept: "application/json",
		"User-Agent": "rustlings-web",
	}

	// Obtener datos del usuario
	const [userRes, emailsRes] = await Promise.all([
		fetch("https://api.github.com/user", { headers }),
		fetch("https://api.github.com/user/emails", { headers }),
	])

	const userText = await userRes.text()
	const emailsText = await emailsRes.text()

	let ghUser: GitHubUser
	let ghEmails: GitHubEmail[]
	try {
		ghUser = JSON.parse(userText)
		ghEmails = JSON.parse(emailsText)
	} catch {
		return redirect("/login?error=oauth_token")
	}

	const primaryEmail = ghEmails.find((e) => e.primary && e.verified)?.email ?? ghUser.email
	if (!primaryEmail) {
		return redirect("/login?error=no_email")
	}

	const providerId = String(ghUser.id)

	try {
		let user = await getUserByOAuth(DB, "github", providerId)

		if (!user) {
			const { getUserByEmail } = await import("~/lib/auth/db")
			let existingUser = await getUserByEmail(DB, primaryEmail)
			if (!existingUser) {
				existingUser = await createUser(DB, {
					email: primaryEmail,
					username: ghUser.login,
					fullName: ghUser.name ?? undefined,
				})
			}
			await linkOAuthAccount(DB, {
				userId: existingUser.id,
				provider: "github",
				providerUserId: providerId,
				accessToken,
			})
			user = existingUser
		}

		const token = await createSession(DB, user.id)
		cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
		return redirect("/aprender")
	} catch {
		return redirect("/login?error=oauth_token")
	}
}

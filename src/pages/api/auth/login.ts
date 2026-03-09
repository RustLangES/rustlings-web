import type { APIRoute } from "astro"
import { verifyPassword } from "~/lib/auth/crypto"
import { getUserByEmail } from "~/lib/auth/db"
import { createSession, SESSION_COOKIE, sessionCookieOptions } from "~/lib/auth/session"

export const POST: APIRoute = async ({ request, locals, cookies }) => {
	const db = locals.runtime.env.DB

	let body: { email?: string; password?: string }
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "JSON inválido" }), { status: 400 })
	}

	const { email, password } = body
	if (!email || !password) {
		return new Response(JSON.stringify({ error: "email y password son requeridos" }), {
			status: 400,
		})
	}

	const user = await getUserByEmail(db, email)
	if (!user || !user.password) {
		return new Response(JSON.stringify({ error: "Credenciales incorrectas" }), { status: 401 })
	}

	const valid = await verifyPassword(password, user.password)
	if (!valid) {
		return new Response(JSON.stringify({ error: "Credenciales incorrectas" }), { status: 401 })
	}

	const token = await createSession(db, user.id)
	cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
	return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

import type { APIRoute } from "astro"
import { hashPassword } from "~/lib/auth/crypto"
import { createUser, getUserByEmail } from "~/lib/auth/db"
import { createSession, SESSION_COOKIE, sessionCookieOptions } from "~/lib/auth/session"

export const POST: APIRoute = async ({ request, locals, cookies }) => {
	const db = locals.runtime.env.DB

	let body: { email?: string; password?: string; username?: string }
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "JSON inválido" }), { status: 400 })
	}

	const { email, password, username } = body
	if (!email || !password || !username) {
		return new Response(JSON.stringify({ error: "email, username y password son requeridos" }), {
			status: 400,
		})
	}

	if (password.length < 8) {
		return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 8 caracteres" }), {
			status: 400,
		})
	}

	const existing = await getUserByEmail(db, email)
	if (existing) {
		return new Response(JSON.stringify({ error: "El email ya está registrado" }), { status: 409 })
	}

	const passwordHash = await hashPassword(password)
	const user = await createUser(db, { email, username, passwordHash })
	const token = await createSession(db, user.id)

	cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
	return new Response(JSON.stringify({ ok: true }), { status: 201 })
}

import { generateToken } from "./crypto"

const SESSION_DURATION_DAYS = 30

export interface SessionUser {
	id: string
	email: string
	username: string | null
	full_name: string | null
}

export async function createSession(db: D1Database, userId: string): Promise<string> {
	const id = generateToken()
	const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString()
	const createdAt = new Date().toISOString()
	await db
		.prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
		.bind(id, userId, expiresAt, createdAt)
		.run()
	return id
}

export async function getSessionUser(db: D1Database, token: string): Promise<SessionUser | null> {
	const row = await db
		.prepare(
			`SELECT u.id, u.email, u.username, u.full_name
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = ? AND s.expires_at > datetime('now')`,
		)
		.bind(token)
		.first<SessionUser>()
	return row ?? null
}

export async function deleteSession(db: D1Database, token: string): Promise<void> {
	await db.prepare("DELETE FROM sessions WHERE id = ?").bind(token).run()
}

export const SESSION_COOKIE = "session"

export function sessionCookieOptions(expiresInDays = SESSION_DURATION_DAYS) {
	const isProduction = process.env.NODE_ENV === "production" || globalThis.location?.protocol === "https:"
	return {
		httpOnly: true,
		secure: isProduction,
		sameSite: "lax" as const,
		path: "/",
		maxAge: expiresInDays * 24 * 60 * 60,
	}
}

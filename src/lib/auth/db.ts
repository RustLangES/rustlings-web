import { generateId } from "./crypto"

export interface UserRow {
	id: string
	username: string
	email: string
	password: string | null
	full_name: string | null
	full_name_locked: number
	created_at: string
	updated_at: string
}

export async function getUserByEmail(db: D1Database, email: string): Promise<UserRow | null> {
	return db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<UserRow>()
}

export async function getUserById(db: D1Database, id: string): Promise<UserRow | null> {
	return db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<UserRow>()
}

export async function createUser(
	db: D1Database,
	data: { email: string; username: string; passwordHash?: string; fullName?: string },
): Promise<UserRow> {
	const id = generateId()
	const now = new Date().toISOString()
	await db
		.prepare(
			"INSERT INTO users (id, email, username, password, full_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
		)
		.bind(id, data.email, data.username, data.passwordHash ?? null, data.fullName ?? null, now, now)
		.run()
	const user = await getUserById(db, id)
	if (!user) throw new Error(`Failed to retrieve user after creation: ${id}`)
	return user
}

export async function getUserByOAuth(
	db: D1Database,
	provider: string,
	providerUserId: string,
): Promise<UserRow | null> {
	return db
		.prepare(
			`SELECT u.* FROM users u
       JOIN oauth_accounts o ON o.user_id = u.id
       WHERE o.provider = ? AND o.provider_user_id = ?`,
		)
		.bind(provider, providerUserId)
		.first<UserRow>()
}

export async function linkOAuthAccount(
	db: D1Database,
	data: {
		userId: string
		provider: string
		providerUserId: string
		accessToken?: string
		refreshToken?: string
		expiresAt?: string
	},
): Promise<void> {
	const id = generateId()
	const now = new Date().toISOString()
	await db
		.prepare(
			`INSERT INTO oauth_accounts (id, user_id, provider, provider_user_id, access_token, refresh_token, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (provider, provider_user_id) DO UPDATE SET
         access_token = excluded.access_token,
         refresh_token = excluded.refresh_token,
         expires_at = excluded.expires_at`,
		)
		.bind(
			id,
			data.userId,
			data.provider,
			data.providerUserId,
			data.accessToken ?? null,
			data.refreshToken ?? null,
			data.expiresAt ?? null,
			now,
		)
		.run()
}

import { tracks } from "~/const/tracks"

/**
 * Local-only auth bypass.
 *
 * When NODE_ENV=develop (shell env or `.dev.vars`) and the request comes from
 * localhost, every request is treated as a simulated user. Never active on a
 * deployed host, even if the variable leaks into production.
 *
 * DEV_PROGRESS picks the account state (re-applied on every server start):
 *   complete (default) — every track done, certificates issued, name locked
 *   partial            — ~45% of each track done, no certificate, name editable
 *   new                — nothing done, no name: first-visit / onboarding flows
 */

export const DEV_USER = {
	id: "dev-user",
	email: "ferris@rustlings.local",
	username: "ferris-dev",
} as const

const DEV_FULL_NAME = "Ferris Crustáceo"
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"])

function readEnv(runtimeEnv: unknown, name: "NODE_ENV" | "DEV_PROGRESS"): string | undefined {
	const fromRuntime = (runtimeEnv as Record<string, unknown> | undefined)?.[name]
	if (typeof fromRuntime === "string") return fromRuntime
	// Read through an alias so Vite's `process.env.NODE_ENV` define can't inline it at build time
	const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
	return proc?.env?.[name]
}

export function isDevAuthBypass(url: URL, runtimeEnv: unknown): boolean {
	return readEnv(runtimeEnv, "NODE_ENV") === "develop" && LOCAL_HOSTS.has(url.hostname)
}

type DevProgress = "complete" | "partial" | "new"

function readDevProgress(runtimeEnv: unknown): DevProgress {
	const value = readEnv(runtimeEnv, "DEV_PROGRESS")
	return value === "partial" || value === "new" ? value : "complete"
}

let seeded: Promise<void> | null = null

/** Creates/resets the simulated account in the DEV_PROGRESS state. Runs once per server process. */
export function ensureDevAccount(db: D1Database, runtimeEnv?: unknown): Promise<void> {
	seeded ??= seedDevAccount(db, readDevProgress(runtimeEnv)).catch((error) => {
		seeded = null
		// biome-ignore lint/suspicious/noConsole: local-only diagnostics for the dev account
		console.warn(
			"[dev-account] No se pudo sembrar la cuenta simulada. ¿Aplicaste las migraciones locales?\n" +
				"  npx wrangler d1 migrations apply rustlings --local\n",
			error,
		)
	})
	return seeded
}

async function seedDevAccount(db: D1Database, progress: DevProgress): Promise<void> {
	const now = new Date().toISOString()
	const activeTracks = tracks.filter((track) => !track.disabled && track.slugs.length > 0)
	const fullName = progress === "new" ? null : DEV_FULL_NAME
	const nameLocked = progress === "complete" ? 1 : 0

	const statements = [
		db
			.prepare(
				`INSERT INTO users (id, username, email, full_name, full_name_locked, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT (id) DO UPDATE SET full_name = excluded.full_name, full_name_locked = excluded.full_name_locked`,
			)
			.bind(DEV_USER.id, DEV_USER.username, DEV_USER.email, fullName, nameLocked, now, now),
		// Start from a clean slate so switching modes never leaves stale rows behind
		db
			.prepare("DELETE FROM user_section_progress WHERE user_id = ?")
			.bind(DEV_USER.id),
		db.prepare("DELETE FROM user_course_progress WHERE user_id = ?").bind(DEV_USER.id),
		db.prepare("DELETE FROM user_certificates WHERE user_id = ?").bind(DEV_USER.id),
	]

	if (progress !== "new") {
		for (const [index, track] of activeTracks.entries()) {
			const total = track.slugs.length
			const doneCount = progress === "complete" ? total : Math.max(1, Math.floor(total * 0.45))
			const lastDone = track.slugs[doneCount - 1]
			const resumeAt = progress === "complete" ? lastDone : track.slugs[doneCount]
			const isComplete = doneCount === total
			const pct = Math.round((doneCount / total) * 100)

			statements.push(
				db
					.prepare(
						`INSERT INTO user_section_progress (id, user_id, course_id, section_slug, updated_at)
             VALUES (?, ?, ?, ?, ?)`,
					)
					.bind(`dev-progress-${track.id}`, DEV_USER.id, track.id, lastDone, now),
				db
					.prepare(
						`INSERT INTO user_course_progress
               (id, user_id, course_id, completed, progress_percentage, started_at, completed_at, last_lesson_slug, last_lesson_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					)
					.bind(
						`dev-course-${track.id}`,
						DEV_USER.id,
						track.id,
						isComplete ? 1 : 0,
						pct,
						now,
						isComplete ? now : null,
						resumeAt,
						now,
						now,
					),
			)
			if (isComplete) {
				statements.push(
					db
						.prepare(
							`INSERT INTO user_certificates (id, user_id, course_id, name_used, issued_at)
               VALUES (?, ?, ?, ?, ?)`,
						)
						.bind(`dev-cert-${String(index + 1).padStart(4, "0")}`, DEV_USER.id, track.id, DEV_FULL_NAME, now),
				)
			}
		}
	}

	await db.batch(statements)
	// biome-ignore lint/suspicious/noConsole: local-only diagnostics for the dev account
	console.info(`[dev-account] Sesión simulada como "${DEV_USER.username}" · DEV_PROGRESS=${progress}`)
}

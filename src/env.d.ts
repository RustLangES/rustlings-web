/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
	DB: D1Database
	GH_CLIENT_ID: string
	GH_CLIENT_SECRET: string
	SESSION_SECRET: string
	/** "develop" enables the local-only simulated account (see lib/auth/dev-account.ts) */
	NODE_ENV?: string
	/** Simulated account state when NODE_ENV=develop: "complete" | "partial" | "new" */
	DEV_PROGRESS?: string
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>

declare namespace App {
	interface Locals extends Runtime {
		user: { id: string; email: string; username: string | null } | null
		lang: "es" | "en"
	}
}

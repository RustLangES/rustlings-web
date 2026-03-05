/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
	DB: D1Database
	GITHUB_CLIENT_ID: string
	GITHUB_CLIENT_SECRET: string
	SESSION_SECRET: string
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>

declare namespace App {
	interface Locals extends Runtime {
		user: { id: string; email: string; username: string | null } | null
	}
}

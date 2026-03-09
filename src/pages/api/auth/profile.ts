import type { APIRoute } from "astro"

export const PATCH: APIRoute = async ({ request, locals }) => {
	const user = locals.user
	if (!user) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	let body: { fullName?: string; username?: string }
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
	}

	const { DB } = locals.runtime.env
	const now = new Date().toISOString()

	// Handle username update
	if (body.username !== undefined) {
		const username = body.username.trim()
		if (!username) {
			return new Response(JSON.stringify({ error: "El usuario no puede estar vacío" }), { status: 400 })
		}
		if (username.length > 30) {
			return new Response(JSON.stringify({ error: "El usuario es demasiado largo (máx. 30 caracteres)" }), {
				status: 400,
			})
		}
		if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
			return new Response(
				JSON.stringify({ error: "El usuario solo puede contener letras, números, guiones y guiones bajos" }),
				{ status: 400 },
			)
		}
		const existing = await DB.prepare("SELECT id FROM users WHERE username = ? AND id != ?")
			.bind(username, user.id)
			.first<{ id: string }>()
		if (existing) {
			return new Response(JSON.stringify({ error: "Ese nombre de usuario ya está en uso" }), { status: 409 })
		}
		await DB.prepare("UPDATE users SET username = ?, updated_at = ? WHERE id = ?").bind(username, now, user.id).run()
	}

	// Handle fullName update
	if (body.fullName !== undefined) {
		const fullName = body.fullName.trim()
		if (fullName.length > 80) {
			return new Response(JSON.stringify({ error: "Nombre demasiado largo" }), { status: 400 })
		}
		const row = await DB.prepare("SELECT full_name_locked FROM users WHERE id = ?")
			.bind(user.id)
			.first<{ full_name_locked: number }>()
		if (row?.full_name_locked) {
			return new Response(JSON.stringify({ error: "El nombre ya fue modificado y no puede cambiarse nuevamente" }), {
				status: 403,
			})
		}
		await DB.prepare("UPDATE users SET full_name = ?, full_name_locked = 1, updated_at = ? WHERE id = ?")
			.bind(fullName || null, now, user.id)
			.run()
	}

	return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

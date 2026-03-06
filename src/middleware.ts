import { defineMiddleware } from "astro:middleware"
import { getSessionUser, SESSION_COOKIE } from "~/lib/auth/session"

const SUPPORTED_LANGS = ["es", "en"] as const
type Lang = (typeof SUPPORTED_LANGS)[number]

function detectLang(request: Request): Lang {
	const header = request.headers.get("Accept-Language") ?? ""
	for (const part of header.split(",")) {
		const code = part.trim().split(/[-;]/)[0].toLowerCase()
		if ((SUPPORTED_LANGS as readonly string[]).includes(code)) {
			return code as Lang
		}
	}
	return "es"
}

export const onRequest = defineMiddleware(async (context, next) => {
	const token = context.cookies.get(SESSION_COOKIE)?.value
	if (token) {
		const user = await getSessionUser(context.locals.runtime.env.DB, token)
		context.locals.user = user ? { id: user.id, email: user.email, username: user.username } : null
	} else {
		context.locals.user = null
	}

	context.locals.lang = detectLang(context.request)

	return next()
})

import { defineMiddleware } from "astro:middleware"
import { DEV_USER, ensureDevAccount, isDevAuthBypass } from "~/lib/auth/dev-account"
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

function langFromPath(url: URL): Lang {
	const segment = url.pathname.split("/")[1]
	return (SUPPORTED_LANGS as readonly string[]).includes(segment) ? (segment as Lang) : "es"
}

export const onRequest = defineMiddleware(async (context, next) => {
	const token = context.isPrerendered ? undefined : context.cookies.get(SESSION_COOKIE)?.value
	if (!context.isPrerendered && isDevAuthBypass(context.url, context.locals.runtime?.env)) {
		await ensureDevAccount(context.locals.runtime.env.DB, context.locals.runtime.env)
		context.locals.user = { ...DEV_USER }
	} else if (token) {
		const user = await getSessionUser(context.locals.runtime.env.DB, token)
		context.locals.user = user ? { id: user.id, email: user.email, username: user.username } : null
	} else {
		context.locals.user = null
	}

	// Prerendered pages have no real request headers: take the language from the URL instead
	context.locals.lang = context.isPrerendered ? langFromPath(context.url) : detectLang(context.request)

	return next()
})

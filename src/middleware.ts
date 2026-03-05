import { defineMiddleware } from "astro:middleware"
import { getSessionUser, SESSION_COOKIE } from "~/lib/auth/session"

export const onRequest = defineMiddleware(async (context, next) => {
	const token = context.cookies.get(SESSION_COOKIE)?.value
	if (token) {
		const user = await getSessionUser(context.locals.runtime.env.DB, token)
		context.locals.user = user ? { id: user.id, email: user.email, username: user.username } : null
	} else {
		context.locals.user = null
	}
	return next()
})

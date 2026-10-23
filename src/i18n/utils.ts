import { defaultLang, ui } from "./ui"

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/")
	if (lang in ui) return lang as keyof typeof ui
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	/** Looks up a UI string; `{placeholder}` tokens are filled from `params` when given. */
	return function t(key: keyof (typeof ui)[typeof defaultLang], params?: Record<string, string | number>) {
		const text: string = ui[lang][key] ?? ui[defaultLang][key]
		if (!params) return text
		return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match))
	}
}

import { en_keys } from "./keys/en.keys"
import { es_keys } from "./keys/es.keys"

export const languages = {
	es: "Español",
	en: "English",
} as const

export const defaultLang = "es"

export const ui = {
	es: es_keys,
	en: en_keys,
} as const

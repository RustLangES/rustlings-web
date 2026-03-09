import type { Track } from "~/entities/track"

export const tracks: Track[] = [
	{
		id: "fundamentos-de-rust",
		title: "track.fundamentos-de-rust.title",
		description: "track.fundamentos-de-rust.description",
		href: "/introduccion-rust",
		lessons: 39,
		badge: "track.badge.beginner",
		disabled: false,
		slugs: [
			"introduccion-rust",
			"sintaxis-esencial",
			"variables-mutabilidad",
			"tipos-primitivos",
			"constantes-shadowing",
			"ejercicio-sintaxis",
			"control-flujo",
			"if-expresion",
			"match",
			"bucles",
			"ejercicio-control-flujo",
			"funciones",
			"ejercicio-funciones",
			"ownership",
			"ejercicio-ownership",
			"borrowing",
			"referencias-inmutables",
			"referencias-mutables",
			"ejercicio-borrowing",
			"slices",
			"ejercicio-slices",
			"structs",
			"definicion-structs",
			"metodos-impl",
			"ejercicio-structs",
			"enums",
			"enums-con-datos",
			"option-result",
			"ejercicio-enums",
			"manejo-errores",
			"result-y-propagacion",
			"ejercicio-errores",
			"colecciones",
			"vec",
			"hashmap",
			"iteradores",
			"ejercicio-colecciones",
			"modulos",
			"ejercicio-modulos",
		],
	},
	{
		// Temas a tocar:
		// Lifetimes explícitos
		// Traits
		// Generics
		// Closures
		// Iteradores
		// Diseño de APIs
		id: "rust-avanzado-diseno-abstraccion",
		title: "track.rust-avanzado-diseno-abstraccion.title",
		description: "track.rust-avanzado-diseno-abstraccion.description",
		href: "/introduccion",
		lessons: 0,
		badge: "track.badge.advanced",
		disabled: true,
		slugs: [],
	},
]

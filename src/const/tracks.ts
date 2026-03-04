import type { Track } from "~/entities/track"

export const tracks: Track[] = [
	{
		id: "fundamentos-de-rust",
		title: "Fundamentos de Rust",
		description:
			"Aprende Rust desde los fundamentos: sintaxis, ownership, borrowing y más. Ideal si nunca has programado en Rust.",
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
		title: "Rust Avanzado: Diseño y Abstracción",
		description:
			"Profundiza en Rust con temas avanzados como lifetimes, traits, macros y programación asíncrona. Ideal para quienes ya conocen los fundamentos.",
		href: "/introduccion",
		lessons: 0,
		badge: "track.badge.advanced",
		disabled: true,
		slugs: [],
	},
]

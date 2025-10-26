import { defineCollection, getCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const content = defineCollection({
	loader: glob({ pattern: "*.{md,mdx}", base: "./src/content" }),
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		order: z.number(),
		nextPath: z.string().optional(),
		previousPath: z.string().optional(),
		editor: z.boolean().optional(),
	}),
})

/**
 * * Obtiene todo el contenido de la colección "content" y lo ordena por el campo 'order'.
 */
export const allContent = await getCollection("content").then((e) => e.sort((a, b) => a.data.order - b.data.order))

/**
 * Exporta las colecciones definidas para Astro.
 *
 * ! ADVERTENCIA: Esta es una variable interna de Astro y no debe ser utilizada directamente en el código de la aplicación.
 */
export const collections = { content }

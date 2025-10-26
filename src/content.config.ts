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
 * Obtiene todo el contenido de la colección "content", lo ordena por el campo 'order'
 * @returns id (número inicial) y slug (nombre) de cada entrada.
 */
export const allContent = await getCollection("content").then((entries) => {
	return entries
		.sort((a, b) => a.data.order - b.data.order)
		.map((entry) => {
			const [, id, slug] = entry.id.match(/^(\d+)(.+)$/) || []
			return { ...entry, id, slug }
		})
})
console.log("allContent", allContent)
/**
 * Exporta las colecciones definidas para Astro.
 *
 * ! ADVERTENCIA: Esta es una variable interna de Astro y no debe ser utilizada directamente en el código de la aplicación.
 */
export const collections = { content }

import type { Frontmatter, MarkdownInstance } from "./types/mdx"

export const lesson = Object.values(
	import.meta.glob<MarkdownInstance<Frontmatter>>("../../content/lessons/*.{md,mdx}", {
		eager: true,
	}),
)

export const tutorial = Object.values(
	import.meta.glob<MarkdownInstance<Frontmatter>>("../../content/tutorials/*.{md,mdx}", {
		eager: true,
	}),
)

console.log("Lessons:", lesson)
console.log("Tutorials:", tutorial[0])

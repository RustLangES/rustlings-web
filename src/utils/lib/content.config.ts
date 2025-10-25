import type { Frontmatter, MarkdownInstance } from "./types/mdx"

export const content = Object.values(
	import.meta.glob<MarkdownInstance<Frontmatter>>("../../content/*.{md,mdx}", {
		eager: true,
	}),
)

console.log("Content:", content[0].frontmatter.slug)
console.log(content.map((t) => t.frontmatter.slug))

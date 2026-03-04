import type { AstroComponentFactory } from "astro/runtime/server/index.js"

type ContentFrontmatter = {
	editor: boolean
	code?: string
	expectedOutput?: string
}

type ContentHeading = {
	depth: number
	slug: string
	text: string
}

type ContentMeta = {
	id: number
	slug: string
	title: string
}

interface RawContent {
	frontmatter: ContentFrontmatter
	Content: AstroComponentFactory
	getHeadings: () => ContentHeading[]
}

export type Content = Omit<RawContent, "frontmatter"> & {
	data: ContentFrontmatter
	meta: ContentMeta
}

function extractMetadata(filepath: string) {
	const filename =
		filepath
			.split("/")
			.pop()
			?.replace(/\.mdx?$/, "") ?? ""
	const [, id, slug] = filename.match(/^(\d+)\.(.+)$/) ?? []
	const title = slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? ""

	return { id: Number(id), slug, title }
}

const files = import.meta.glob<RawContent>("./content/*.{md,mdx}", { eager: true })

export const lessons: Content[] = Object.entries(files)
	.map(([filepath, { Content, getHeadings, frontmatter }]) => ({
		Content,
		getHeadings,
		data: frontmatter,
		meta: extractMetadata(filepath),
	}))
	.sort((a, b) => a.meta.id - b.meta.id)

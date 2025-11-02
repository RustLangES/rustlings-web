import type { AstroComponentFactory } from "astro/runtime/server/index.js"

type ArticleFrontmatter = {
	editor: boolean
}

type ArticleHeading = {
	depth: number
	slug: string
	text: string
}

type ArticleMeta = {
	id: number
	slug: string
	title: string
}

interface RawArticle {
	frontmatter: ArticleFrontmatter
	Content: AstroComponentFactory
	getHeadings: () => ArticleHeading[]
}

type Article = Omit<RawArticle, "frontmatter"> & {
	data: ArticleFrontmatter
	meta: ArticleMeta
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

const files = import.meta.glob<RawArticle>("../content/*.{md,mdx}", { eager: true })

const articles: Article[] = Object.entries(files)
	.map(([filepath, { Content, getHeadings, frontmatter }]) => ({
		Content,
		getHeadings,
		data: frontmatter,
		meta: extractMetadata(filepath),
	}))
	.sort((a, b) => a.meta.id - b.meta.id)

export default articles

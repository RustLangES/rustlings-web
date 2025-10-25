export interface MarkdownInstance<T extends Record<string, unknown>> {
	frontmatter: T
	file: string
	url: string
	rawContent: string
	compiledContent: string
	Content: (props?: Record<string, unknown>) => unknown
	getHeadings: () => Promise<{ depth: number; slug: string; text: string }[]>
}

export interface Frontmatter {
	title?: string
	nextPath?: string
	previousPath?: string
	slug?: string
	editor?: boolean
	order?: number
	[key: string]: unknown
}

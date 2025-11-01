import { IconLicense } from "@tabler/icons-react"
import React from "react"

interface ReactMarkdownContainerProps {
	children: React.ReactNode
	tutorial: string
}

export default function ReactMarkdownContainer({ children, tutorial }: ReactMarkdownContainerProps) {
	return (
		<>
			<div id="title-info" className="absolute left-0 top-14 w-full hidden">
				<div className="relative">
					<IconLicense stroke={2} size={14} className="rotate-90 absolute -top-9 left-4.5 text-yellow" />
					<h2 className="text-[12px] font-bold text-center rotate-90">Contenido</h2>
				</div>
			</div>
			<article id="article-info" className="scroll-container m-2 overflow-y-auto p-2">
				<article className="mb-6 text-secondary min-w-[400px]" id="content-markdown">
					<h2 className="text-xl font-bold mb-2">{tutorial}</h2>
					{children}
					<hr className="my-6 border-gray-700" />
				</article>
				<div className="flex justify-center pb-2 mt-auto min-w-[400px]">
					{/*<NavButtons previous={previous} next={next}/>*/}
				</div>
			</article>
		</>
	)
}

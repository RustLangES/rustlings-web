import { IconLicense } from "@tabler/icons-react"
import React from "react"
import useDimensions from "~/features/shared/hooks/useDimensions.ts"
import useWindowSize from "~/features/shared/hooks/useWindowSize.ts"

interface ReactMarkdownContainerProps {
	children: React.ReactNode
}

export default function ReactMarkdownContainer({ children }: ReactMarkdownContainerProps) {
	const [ref, { width }] = useDimensions<HTMLElement>()
	const windowSize = useWindowSize()

	if (width <= windowSize.width / 10) {
		return (
			<div ref={ref} className="relative  flex flex-col h-32 items-center justify-center p-2 text-yellow">
				<IconLicense stroke={2} size={20} className="rotate-90 mx-auto" />
				<h2 className="font-bold text-center rotate-90 mt-10">Contenido</h2>
			</div>
		)
	}

	return (
		<article ref={ref} className="scroll-container m-2 overflow-y-auto p-2">
			<article className="mb-6 text-secondary min-w-[400px]" id="content-markdown">
				{children}
				<hr className="my-6 border-gray-700" />
			</article>
			<div className="flex justify-center pb-2 mt-auto min-w-[400px]">
				{/* <NavButtons previous={previous} next={next} /> */}
			</div>
		</article>
	)
}

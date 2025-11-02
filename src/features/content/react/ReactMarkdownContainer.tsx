import { IconLicense } from "@tabler/icons-react"
import type { ReactNode } from "react"
import ReactCollapsiblePanel from "~/features/content/react/ReactCollapsiblePanel.tsx"

interface ReactMarkdownContainerProps {
	children: ReactNode
}

export default function ReactMarkdownContainer({ children }: ReactMarkdownContainerProps) {
	return (
		<ReactCollapsiblePanel icon={<IconLicense size={16} />} title="Contenido">
			<article className="scroll-container m-2 overflow-y-auto p-2">
				<article className="mb-6 text-secondary min-w-[400px]" id="content-markdown">
					{children}
					<hr className="my-6 border-gray-700" />
				</article>
				<div className="flex justify-center pb-2 mt-auto min-w-[400px]">
					{/* <NavButtons previous={previous} next={next} /> */}
				</div>
			</article>
		</ReactCollapsiblePanel>
	)
}

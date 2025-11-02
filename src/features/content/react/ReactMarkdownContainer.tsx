import { IconLicense } from "@tabler/icons-react"
import { type ReactNode } from "react"
import { PanelVariant } from "~/features/content/enums/PanelVariant.enum.ts"
import ReactCollapsiblePanel from "~/features/content/react/ReactCollapsiblePanel.tsx"
import { usePanelStore } from "~/features/content/stores/Panel.store.ts"

interface ReactMarkdownContainerProps {
	children: ReactNode
}

export default function ReactMarkdownContainer({ children }: ReactMarkdownContainerProps) {
	const isCollapsed = usePanelStore((state) => state.isCollapsed(`${PanelVariant.ContentToEditor}-primary`))

	return (
		<ReactCollapsiblePanel isCollapsed={isCollapsed} icon={<IconLicense size={16} />} title="Contenido">
			<article className="scroll-container m-2 overflow-y-auto p-2">
				<article className="mb-6 text-secondary min-w-[400px]">
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

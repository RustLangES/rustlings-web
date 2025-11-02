import { IconGripVertical } from "@tabler/icons-react"
import { type ReactNode, useMemo } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import useWindowSize from "~/features/shared/hooks/useWindowSize.ts"

interface PanelContainerProps {
	direction: "horizontal" | "vertical"
	defaultLayout: [number, number]
	children?: ReactNode
	first?: ReactNode
	second?: ReactNode
}

export default function ReactPanelContainer({
	first,
	second,
	direction = "horizontal",
	defaultLayout = [50, 50],
}: PanelContainerProps) {
	const { width } = useWindowSize()

	const size = useMemo(() => {
		if (width >= 1024) return 5
		if (width >= 768) return 8
		return 10
	}, [width])

	const offset = useMemo(() => 4, [])

	return (
		<PanelGroup direction={direction} className="h-full min-h-0 grow">
			<Panel
				defaultSize={defaultLayout[0]}
				className="min-h-0"
				minSize={size + offset}
				collapsible
				collapsedSize={size}
			>
				{first}
			</Panel>
			<PanelResizeHandle className={"flex justify-center items-center"}>
				<div className={"bg-primary mx-auto  cursor-col-resize grow flex items-center justify-center"}>
					<IconGripVertical size={14} className={direction === "vertical" ? "rotate-90" : ""} />
				</div>
			</PanelResizeHandle>
			<Panel
				defaultSize={defaultLayout[1]}
				className="min-h-0"
				minSize={size + offset}
				collapsible
				collapsedSize={size}
			>
				{second}
			</Panel>
		</PanelGroup>
	)
}

import { IconGripVertical } from "@tabler/icons-react"
import type { ReactNode } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

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
	return (
		<PanelGroup direction={direction} className="h-full min-h-0">
			<Panel defaultSize={defaultLayout[0]} className="min-h-0">
				{first}
			</Panel>
			<div className={"w-2 flex justify-center items-center rounded-full cursor-col-resize mx-auto"}>
				<PanelResizeHandle>
					<IconGripVertical size={14} className={direction === "vertical" ? "rotate-90" : ""} />
				</PanelResizeHandle>
			</div>
			<Panel defaultSize={defaultLayout[1]} className="min-h-0">
				{second}
			</Panel>
		</PanelGroup>
	)
}

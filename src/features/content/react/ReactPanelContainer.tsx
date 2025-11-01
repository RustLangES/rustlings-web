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
		<PanelGroup direction={direction} className="h-full min-h-0 ">
			<Panel defaultSize={defaultLayout[0]} className="min-h-0">
				{first}
			</Panel>
			<PanelResizeHandle className={"flex justify-center items-center"}>
				<div className={"bg-primary mx-auto  cursor-col-resize grow flex items-center justify-center"}>
					<IconGripVertical size={14} className={direction === "vertical" ? "rotate-90" : ""} />
				</div>
			</PanelResizeHandle>
			<Panel defaultSize={defaultLayout[1]} className="min-h-0">
				{second}
			</Panel>
		</PanelGroup>
	)
}

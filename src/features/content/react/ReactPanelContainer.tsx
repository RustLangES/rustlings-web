import { IconGripVertical } from "@tabler/icons-react"
import React from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

const defaultLayout = [50, 50]

interface PanelContainerProps {
	leftHtml: string
	rightHtml: string
}

export default function ReactPanelContainer({ leftHtml, rightHtml }: PanelContainerProps) {
	return (
		<PanelGroup direction="horizontal" className={"grow"}>
			<Panel defaultSize={defaultLayout[0]}>
				<div className={"h-full"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: leftHtml }} />
			</Panel>
			<PanelResizeHandle className="w-2 flex justify-center items-center rounded-full cursor-col-resize">
				<IconGripVertical size={14} />
			</PanelResizeHandle>
			<Panel defaultSize={defaultLayout[1]}>
				<div className={"h-full"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: rightHtml }} />
			</Panel>
		</PanelGroup>
	)
}

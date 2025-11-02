import { IconGripVertical } from "@tabler/icons-react"
import { type ReactNode, useEffect, useMemo, useRef } from "react"
import { type ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { PanelVariant } from "~/features/content/enums/PanelVariant.enum.ts"
import usePanelContainerBreakpoints from "~/features/content/hooks/usePanelContainerBreakpoints.ts"
import { usePanelStore } from "~/features/content/stores/Panel.store.ts"
import useWindowSize from "~/features/shared/hooks/useWindowSize.ts"

interface PanelContainerProps {
	direction: "horizontal" | "vertical"
	defaultLayout: [number, number]
	first?: ReactNode
	second?: ReactNode
	variant: PanelVariant
}

export default function ReactPanelContainer({
	first,
	second,
	direction = "horizontal",
	defaultLayout = [50, 50],
	variant,
}: PanelContainerProps) {
	const { width } = useWindowSize()
	const { size } = usePanelContainerBreakpoints(width)
	const offset = useMemo(() => 4, [])

	const registerPanel = usePanelStore((state) => state.registerPanel)
	const unregisterPanel = usePanelStore((state) => state.unregisterPanel)
	const setCollapsed = usePanelStore((state) => state.setCollapsed)

	const primaryId = `${variant}-primary`
	const secondaryId = `${variant}-secondary`

	const primaryPanelRef = useRef<ImperativePanelHandle>(null)
	const secondaryPanelRef = useRef<ImperativePanelHandle>(null)

	useEffect(() => {
		if (primaryPanelRef.current) registerPanel(primaryId, primaryPanelRef.current)
		if (secondaryPanelRef.current) registerPanel(secondaryId, secondaryPanelRef.current)

		return () => {
			unregisterPanel(primaryId)
			unregisterPanel(secondaryId)
		}
	}, [registerPanel, unregisterPanel, primaryId, secondaryId])

	return (
		<PanelGroup direction={direction} className="h-full min-h-0 grow">
			<Panel
				ref={primaryPanelRef}
				defaultSize={defaultLayout[0]}
				className="min-h-0"
				minSize={size + offset}
				collapsible
				collapsedSize={size}
				onCollapse={() => setCollapsed(primaryId, true)}
				onExpand={() => setCollapsed(primaryId, false)}
			>
				{first}
			</Panel>
			<PanelResizeHandle className={"flex justify-center items-center"}>
				<div className={"bg-primary mx-auto cursor-col-resize grow flex items-center justify-center"}>
					<IconGripVertical size={14} className={direction === "vertical" ? "rotate-90" : ""} />
				</div>
			</PanelResizeHandle>
			<Panel
				ref={secondaryPanelRef}
				defaultSize={defaultLayout[1]}
				className="min-h-0"
				minSize={size + offset}
				collapsible
				collapsedSize={size}
				onCollapse={() => setCollapsed(secondaryId, true)}
				onExpand={() => setCollapsed(secondaryId, false)}
			>
				{second}
			</Panel>
		</PanelGroup>
	)
}

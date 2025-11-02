import { IconCode } from "@tabler/icons-react"
import { PanelVariant } from "~/features/content/enums/PanelVariant.enum.ts"
import ReactCodeEditor from "~/features/content/react/ReactCodeEditor.tsx"
import ReactCollapsiblePanel from "~/features/content/react/ReactCollapsiblePanel.tsx"
import ReactPanelContainer from "~/features/content/react/ReactPanelContainer.tsx"
import ReactTerminal from "~/features/content/react/ReactTerminal.tsx"
import { usePanelStore } from "~/features/content/stores/Panel.store.ts"

export default function ReactPlayground() {
	const isCollapsed = usePanelStore((state) => state.isCollapsed(`${PanelVariant.ContentToEditor}-secondary`))
	return (
		<ReactCollapsiblePanel icon={<IconCode size={16} />} title="Editor" isCollapsed={isCollapsed}>
			<ReactPanelContainer
				variant={PanelVariant.EditorToTerminal}
				direction={"vertical"}
				defaultLayout={[70, 30]}
				second={<ReactTerminal />}
				first={
					<div className="h-full min-h-0 flex flex-col">
						<ReactCodeEditor />
					</div>
				}
			/>
		</ReactCollapsiblePanel>
	)
}

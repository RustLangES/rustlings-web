import { IconCode } from "@tabler/icons-react"
import ReactCodeEditor from "~/features/content/react/ReactCodeEditor.tsx"
import ReactCollapsiblePanel from "~/features/content/react/ReactCollapsiblePanel.tsx"
import ReactPanelContainer from "~/features/content/react/ReactPanelContainer.tsx"
import ReactTerminal from "~/features/content/react/ReactTerminal.tsx"

export default function ReactPlayground() {
	return (
		<ReactCollapsiblePanel icon={<IconCode size={16} />} title="Editor">
			<ReactPanelContainer
				direction={"vertical"}
				defaultLayout={[70, 30]}
				second={<ReactTerminal />}
				first={
					<div className="min-h-0 grow">
						<ReactCodeEditor />
					</div>
				}
			/>
		</ReactCollapsiblePanel>
	)
}

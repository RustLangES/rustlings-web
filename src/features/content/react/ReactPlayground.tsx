import ReactCodeEditor from "~/features/content/react/ReactCodeEditor.tsx"
import ReactPanelContainer from "~/features/content/react/ReactPanelContainer.tsx"
import ReactPanelHeader from "~/features/content/react/ReactPanelHeader.tsx"
import ReactTerminal from "~/features/content/react/ReactTerminal.tsx"

export default function ReactPlayground() {
	return (
		<div className="flex h-full min-h-0 flex-col">
			<ReactPanelHeader />
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
		</div>
	)
}

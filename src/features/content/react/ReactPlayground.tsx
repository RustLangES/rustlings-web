import { IconCode } from "@tabler/icons-react"
import React from "react"
import ReactCodeEditor from "~/features/content/react/ReactCodeEditor.tsx"
import ReactPanelContainer from "~/features/content/react/ReactPanelContainer.tsx"
import ReactPanelHeader from "~/features/content/react/ReactPanelHeader.tsx"
import ReactTerminal from "~/features/content/react/ReactTerminal.tsx"
import useDimensions from "~/features/shared/hooks/useDimensions.ts"
import useWindowSize from "~/features/shared/hooks/useWindowSize.ts"

export default function ReactPlayground() {
	const [ref, { width }] = useDimensions<HTMLElement>()
	const windowSize = useWindowSize()

	if (width <= windowSize.width / 10) {
		return (
			<div ref={ref} className="relative  flex flex-col h-32 items-center justify-center p-2 text-yellow">
				<IconCode size={20} className="rotate-90 mx-auto" />
				<h2 className="font-bold text-center rotate-90 mt-10">Editor</h2>
			</div>
		)
	}

	return (
		<div ref={ref} className="flex h-full min-h-0 flex-col">
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

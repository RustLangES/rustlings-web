import { IconCode } from "@tabler/icons-react"

export default function ReactPanelHeader() {
	return (
		<div className="flex items-center gap-2 px-4 h-10 bg-light-bg border-b border-stroke-color">
			<IconCode size={16} />
			<span className="font-medium">Editor</span>
		</div>
	)
}

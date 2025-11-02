import TerminalTab from "./TerminalTab"

export default function TerminalHeader() {
	return (
		<div className="flex items-end gap-2 border-b border-stroke-color bg-light-bg px-3 h-8">
			<TerminalTab />
		</div>
	)
}

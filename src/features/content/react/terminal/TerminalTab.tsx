import { IconTerminal } from "@tabler/icons-react"

export default function TerminalTab() {
	return (
		<button
			type="button"
			className="flex items-center gap-2 px-3 py-1 rounded-t-sm text-fg font-medium shadow-inner hover:bg-neutral-600/90 transition-colors"
		>
			<IconTerminal size={18} />
			<span>Terminal</span>
		</button>
	)
}

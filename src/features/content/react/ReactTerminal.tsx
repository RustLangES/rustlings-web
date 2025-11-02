import { IconTerminal } from "@tabler/icons-react"

export default function ReactTerminal() {
	return (
		<div className="overflow-auto border-t border-stroke-color rounded-b-lg text-sm font-mono bg-dark-fg h-full">
			<div className="flex items-end gap-2 border-b border-stroke-color bg-light-bg px-3 h-8">
				<button
					type="button"
					className="flex items-center gap-2 px-3 py-1 rounded-t-sm text-fg font-medium shadow-inner hover:bg-neutral-600/90 transition-colors"
				>
					<IconTerminal size={18} />
					<span>Terminal</span>
				</button>
			</div>

			<div className="flex items-start p-3 text-fg">
				<span className="text-yellow">$&nbsp;</span>
				<span className="text-fg">cargo run</span>
			</div>
		</div>
	)
}

import type { ReactNode } from "react"

interface CollapsiblePanelProps {
	icon: ReactNode
	title: string
	children: ReactNode
	isCollapsed?: boolean
}

export default function ReactCollapsiblePanel({ icon, title, children, isCollapsed = false }: CollapsiblePanelProps) {
	if (isCollapsed) {
		return (
			<div className="flex h-full min-h-0 flex-col items-center justify-between py-4">
				<div className="flex flex-col items-center gap-3">
					<div className="text-primary opacity-80">{icon}</div>
					<span className="text-sm font-medium [writing-mode:vertical-rl] tracking-wider opacity-90">{title}</span>
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-full min-h-0 flex-col">
			<div className="flex items-center gap-2 p-2 border-b border-stroke-color">
				{icon}
				<span className="text-sm font-medium">{title}</span>
			</div>
			{children}
		</div>
	)
}

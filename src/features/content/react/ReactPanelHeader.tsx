import type { ReactNode } from "react"

interface ReactPanelHeaderProps {
	icon: ReactNode
	title: string
}

export default function ReactPanelHeader({ icon, title }: ReactPanelHeaderProps) {
	return (
		<div className="flex items-center gap-2 px-4 h-10 bg-light-bg border-b border-stroke-color">
			{icon}
			<span className="font-medium">{title}</span>
		</div>
	)
}

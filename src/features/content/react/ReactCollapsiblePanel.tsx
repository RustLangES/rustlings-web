import type { ReactNode } from "react"
import useDimensions from "~/features/shared/hooks/useDimensions"
import useWindowSize from "~/features/shared/hooks/useWindowSize"

interface CollapsiblePanelProps {
	icon: ReactNode
	title: string
	children: ReactNode
}

export default function ReactCollapsiblePanel({ icon, title, children }: CollapsiblePanelProps) {
	const [ref, { width }] = useDimensions<HTMLElement>()
	const windowSize = useWindowSize()
	// TODO: tener la ref correspondiente al panel actual para tener disponible esto https://react-resizable-panels.vercel.app/examples/imperative-panel-api
	if (width <= windowSize.width / 20) {
		return (
			<div ref={ref} className="flex h-full min-h-0 flex-col items-center justify-between py-4">
				<div className="flex flex-col items-center gap-3">
					<div className="text-primary opacity-80">{icon}</div>
					<span className="text-sm font-medium [writing-mode:vertical-rl] tracking-wider opacity-90">{title}</span>
				</div>
			</div>
		)
	}

	return (
		<div ref={ref} className="flex h-full min-h-0 flex-col">
			<div className="flex items-center gap-2 p-2 border-b border-stroke-color">
				{icon}
				<span className="text-sm font-medium">{title}</span>
			</div>
			{children}
		</div>
	)
}

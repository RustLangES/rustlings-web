import { useStore } from "@nanostores/react"
import { IconX } from "@tabler/icons-react"

import { closeSidebarStore, useOpenSidebarStore } from "../../../stores/sidebar/open-sidebar-store"

export type SidebarItem = {
	label: string
	href?: string
	onClick?: () => void
}

interface SidebarProps {
	title?: string
	items?: SidebarItem[]
	position?: "left" | "right"
}

export default function Sidebar({ title = "Menú", items = [], position = "left" }: SidebarProps) {
	const isOpen = useStore(useOpenSidebarStore)

	const sidePosition = position === "right" ? "right-0 border-l rounded-l-2xl" : "-left-[1px] border-r rounded-r-2xl"

	const getTransformClass = () => {
		if (isOpen) return "translate-x-0 opacity-100"
		return position === "right" ? "translate-x-full opacity-0" : "-translate-x-full opacity-0"
	}

	return (
		<>
			{isOpen && (
				<button
					type="button"
					aria-label="Cerrar menú"
					onClick={closeSidebarStore}
					onKeyDown={(e) => e.key === "Enter" && closeSidebarStore()}
					className="fixed inset-0 duration-300"
				/>
			)}

			<aside
				className={`fixed top-[-10px] z-50  ${sidePosition}
          h-[calc(100vh-2px)] w-84
          bg-dark-fg/98 backdrop-blur-md
          border-[var(--stroke-color)] shadow-[0_0_30px_rgba(0,0,0,0.4)]
          transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          z-50 flex flex-col overflow-hidden
          ${getTransformClass()}
        `}
			>
				<div className="flex justify-between items-center p-4 border-b border-white/10">
					<h2 className="text-lg font-semibold text-secondary">{title}</h2>
					<button
						type="button"
						onClick={closeSidebarStore}
						aria-label="Cerrar sidebar"
						className="p-1 text-secondary hover:text-yellow transition-colors duration-200"
					>
						<IconX size={22} stroke={2} />
					</button>
				</div>

				<nav className="flex flex-col gap-2 p-4 text-secondary overflow-y-auto" aria-label="Menú de navegación">
					<ul className="space-y-2">
						{items.map((item) => (
							<li key={item.label}>
								{item.href ? (
									<a
										href={item.href}
										onClick={closeSidebarStore}
										className="block px-3 py-2 rounded-md hover:bg-yellow/10 hover:text-yellow transition-all duration-200"
									>
										{item.label.toUpperCase()}
									</a>
								) : (
									<button
										type="button"
										onClick={() => {
											item.onClick?.()
											closeSidebarStore()
										}}
										className="w-full text-left px-3 py-2 rounded-md hover:bg-yellow/10 hover:text-yellow transition-all duration-200"
									>
										{item.label.toUpperCase()}
									</button>
								)}
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</>
	)
}

import { IconMenu4 } from "@tabler/icons-react"
import { toggleOpenSidebarStore } from "~/stores/sidebar/open-sidebar-store"

export default function ToggleSidebarButton() {
	return (
		<button
			type="button"
			aria-label="Abrir menú"
			onClick={toggleOpenSidebarStore}
			className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-secondary border border-transparent hover:border-yellow hover:text-yellow rounded-lg transition-all duration-300"
		>
			<IconMenu4 size={22} stroke={2} />
			<span>Contenido</span>
		</button>
	)
}

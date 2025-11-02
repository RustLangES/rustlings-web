import type { ImperativePanelHandle } from "react-resizable-panels"
import { create } from "zustand/react"

interface PanelState {
	panels: Map<string, ImperativePanelHandle>
	collapsedPanels: Set<string>
	registerPanel: (id: string, panel: ImperativePanelHandle) => void
	unregisterPanel: (id: string) => void
	getPanel: (id: string) => ImperativePanelHandle | null
	setCollapsed: (id: string, isCollapsed: boolean) => void
	isCollapsed: (id: string) => boolean
}

export const usePanelStore = create<PanelState>((set, get) => ({
	panels: new Map(),
	collapsedPanels: new Set(),

	registerPanel: (id, panel) =>
		set((state) => {
			const newPanels = new Map(state.panels)
			newPanels.set(id, panel)
			return { panels: newPanels }
		}),

	unregisterPanel: (id) =>
		set((state) => {
			const newPanels = new Map(state.panels)
			newPanels.delete(id)
			return { panels: newPanels }
		}),

	getPanel: (id) => get().panels.get(id) || null,

	setCollapsed: (id, isCollapsed) =>
		set((state) => {
			const newSet = new Set(state.collapsedPanels)
			if (isCollapsed) {
				newSet.add(id)
			} else {
				newSet.delete(id)
			}
			return { collapsedPanels: newSet }
		}),

	isCollapsed: (id) => get().collapsedPanels.has(id),
}))

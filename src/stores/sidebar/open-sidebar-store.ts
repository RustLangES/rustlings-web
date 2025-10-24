import { atom } from "nanostores"

export const useOpenSidebarStore = atom(false)

export const toggleOpenSidebarStore = () => {
	useOpenSidebarStore.set(!useOpenSidebarStore.get())
}

export const closeSidebarStore = () => {
	useOpenSidebarStore.set(false)
}

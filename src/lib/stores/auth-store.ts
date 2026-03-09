import { atom, computed } from "nanostores"
import type { SessionUser } from "~/lib/auth/session"

export interface UserState {
	id: string
	email: string
	username: string | null
	full_name: string | null
	full_name_locked: boolean
}

// Estados de la store
export const userStore = atom<UserState | null>(null)
export const isLoadingAuth = atom(false)

// Computed values
export const isLoggedIn = computed(userStore, (user) => user !== null)
export const userDisplayName = computed(userStore, (user) => {
	if (!user) return ""
	return user.username || user.email
})

// Acciones
export const authActions = {
	// Inicializar usuario desde servidor
	setUser(sessionUser: SessionUser, fullNameLocked = false) {
		userStore.set({
			id: sessionUser.id,
			email: sessionUser.email,
			username: sessionUser.username,
			full_name: sessionUser.full_name,
			full_name_locked: fullNameLocked,
		})
	},

	// Actualizar información del usuario
	updateUser(updates: Partial<UserState>) {
		const currentUser = userStore.get()
		if (currentUser) {
			userStore.set({ ...currentUser, ...updates })
		}
	},

	// Actualizar solo el nombre completo
	updateFullName(fullName: string) {
		const currentUser = userStore.get()
		if (currentUser) {
			userStore.set({
				...currentUser,
				full_name: fullName,
				full_name_locked: true, // Se bloquea después de la primera edición
			})
		}
	},

	// Limpiar usuario (logout)
	clearUser() {
		userStore.set(null)
	},

	// Verificar si el usuario puede editar su nombre
	canEditName() {
		const user = userStore.get()
		return user && !user.full_name_locked
	},

	// Obtener usuario actual
	getCurrentUser() {
		return userStore.get()
	},

	// Estados de carga
	setLoading(loading: boolean) {
		isLoadingAuth.set(loading)
	},

	// Inicializar desde datos del servidor
	async initializeFromServer() {
		this.setLoading(true)

		try {
			const response = await fetch("/api/auth/me")
			if (response.ok) {
				const userData = await response.json()
				this.setUser(userData.user, userData.full_name_locked)
			} else {
				this.clearUser()
			}
		} catch (_error) {
			this.clearUser()
		} finally {
			this.setLoading(false)
		}
	},
}

// Función de utilidad para inicializar la store en el cliente
export function initAuthStore(initialUser?: SessionUser, fullNameLocked = false) {
	if (typeof window !== "undefined") {
		if (initialUser) {
			authActions.setUser(initialUser, fullNameLocked)
		} else {
			// Si no tenemos usuario inicial, intentamos obtenerlo del servidor
			authActions.initializeFromServer()
		}
	}
}

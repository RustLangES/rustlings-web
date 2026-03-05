import { authActions, isLoggedIn, type UserState, userDisplayName, userStore } from "./auth-store"

// Utilidades para trabajar con el usuario de manera más sencilla

/**
 * Obtiene el usuario actual o null si no está logueado
 */
export function getCurrentUser(): UserState | null {
	return userStore.get()
}

/**
 * Verifica si el usuario está logueado
 */
export function getIsLoggedIn(): boolean {
	return isLoggedIn.get()
}

/**
 * Obtiene el nombre a mostrar del usuario
 */
export function getDisplayName(): string {
	return userDisplayName.get()
}

/**
 * Verifica si el usuario puede editar su nombre
 */
export function canEditName(): boolean {
	return authActions.canEditName()
}

/**
 * Obtiene el email del usuario actual
 */
export function getCurrentEmail(): string | null {
	const user = getCurrentUser()
	return user?.email ?? null
}

/**
 * Obtiene el ID del usuario actual
 */
export function getCurrentUserId(): string | null {
	const user = getCurrentUser()
	return user?.id ?? null
}

/**
 * Reactivamente escucha cambios en el estado del usuario
 */
export function onUserChange(callback: (user: UserState | null) => void): () => void {
	return userStore.subscribe(callback)
}

/**
 * Reactivamente escucha cambios en el nombre de display
 */
export function onDisplayNameChange(callback: (displayName: string) => void): () => void {
	return userDisplayName.subscribe(callback)
}

/**
 * Reactivamente escucha cambios en el estado de login
 */
export function onLoginStateChange(callback: (isLoggedIn: boolean) => void): () => void {
	return isLoggedIn.subscribe(callback)
}

/**
 * Actualiza el elemento del DOM con el nombre del usuario
 */
export function updateDOMElement(elementId: string, fallback = ""): () => void {
	const element = document.getElementById(elementId)
	if (!element) return () => {}

	return onDisplayNameChange((name) => {
		element.textContent = name || fallback
	})
}

/**
 * Configura un elemento para mostrar/ocultar basado en el estado de login
 */
export function toggleElementOnLogin(elementId: string, showWhenLoggedIn = true): () => void {
	const element = document.getElementById(elementId)
	if (!element) return () => {}

	return onLoginStateChange((loggedIn) => {
		const shouldShow = showWhenLoggedIn ? loggedIn : !loggedIn
		element.style.display = shouldShow ? "" : "none"
	})
}

/**
 * Configurar elementos de navegación reactivos
 */
export function setupNavbar(
	options: { usernameElementId?: string; profileLinkId?: string; loginLinkId?: string; logoutLinkId?: string } = {},
): void {
	const {
		usernameElementId = "nav-username",
		profileLinkId = "nav-profile-link",
		loginLinkId = "nav-login-link",
		logoutLinkId = "nav-logout-link",
	} = options

	// Actualizar nombre de usuario
	if (usernameElementId) {
		updateDOMElement(usernameElementId)
	}

	// Mostrar/ocultar elementos basado en estado de login
	toggleElementOnLogin(profileLinkId, true) // Solo mostrar si está logueado
	toggleElementOnLogin(loginLinkId, false) // Solo mostrar si NO está logueado
	toggleElementOnLogin(logoutLinkId, true) // Solo mostrar si está logueado
}

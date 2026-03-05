import {
  userStore,
  isLoggedIn,
  userDisplayName,
  authActions,
  type UserState,
} from "./auth-store";

// Utilidades para trabajar con el usuario de manera más sencilla
export class UserUtils {
  /**
   * Obtiene el usuario actual o null si no está logueado
   */
  static getCurrentUser(): UserState | null {
    return userStore.get();
  }

  /**
   * Verifica si el usuario está logueado
   */
  static isLoggedIn(): boolean {
    return isLoggedIn.get();
  }

  /**
   * Obtiene el nombre a mostrar del usuario
   */
  static getDisplayName(): string {
    return userDisplayName.get();
  }

  /**
   * Verifica si el usuario puede editar su nombre
   */
  static canEditName(): boolean {
    return authActions.canEditName();
  }

  /**
   * Obtiene el email del usuario actual
   */
  static getCurrentEmail(): string | null {
    const user = this.getCurrentUser();
    return user?.email ?? null;
  }

  /**
   * Obtiene el ID del usuario actual
   */
  static getCurrentUserId(): string | null {
    const user = this.getCurrentUser();
    return user?.id ?? null;
  }

  /**
   * Reactivamente escucha cambios en el estado del usuario
   */
  static onUserChange(callback: (user: UserState | null) => void): () => void {
    return userStore.subscribe(callback);
  }

  /**
   * Reactivamente escucha cambios en el nombre de display
   */
  static onDisplayNameChange(
    callback: (displayName: string) => void,
  ): () => void {
    return userDisplayName.subscribe(callback);
  }

  /**
   * Reactivamente escucha cambios en el estado de login
   */
  static onLoginStateChange(
    callback: (isLoggedIn: boolean) => void,
  ): () => void {
    return isLoggedIn.subscribe(callback);
  }

  /**
   * Actualiza el elemento del DOM con el nombre del usuario
   */
  static updateDOMElement(elementId: string, fallback = ""): () => void {
    const element = document.getElementById(elementId);
    if (!element) return () => {};

    return this.onDisplayNameChange((name) => {
      element.textContent = name || fallback;
    });
  }

  /**
   * Configura un elemento para mostrar/ocultar basado en el estado de login
   */
  static toggleElementOnLogin(
    elementId: string,
    showWhenLoggedIn = true,
  ): () => void {
    const element = document.getElementById(elementId);
    if (!element) return () => {};

    return this.onLoginStateChange((loggedIn) => {
      const shouldShow = showWhenLoggedIn ? loggedIn : !loggedIn;
      element.style.display = shouldShow ? "" : "none";
    });
  }

  /**
   * Configurar elementos de navegación reactivos
   */
  static setupNavbar(
    options: {
      usernameElementId?: string;
      profileLinkId?: string;
      loginLinkId?: string;
      logoutLinkId?: string;
    } = {},
  ): void {
    const {
      usernameElementId = "nav-username",
      profileLinkId = "nav-profile-link",
      loginLinkId = "nav-login-link",
      logoutLinkId = "nav-logout-link",
    } = options;

    // Actualizar nombre de usuario
    if (usernameElementId) {
      this.updateDOMElement(usernameElementId);
    }

    // Mostrar/ocultar elementos basado en estado de login
    this.toggleElementOnLogin(profileLinkId, true); // Solo mostrar si está logueado
    this.toggleElementOnLogin(loginLinkId, false); // Solo mostrar si NO está logueado
    this.toggleElementOnLogin(logoutLinkId, true); // Solo mostrar si está logueado
  }
}

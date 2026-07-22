import { ref } from "vue";
/**
 * Servicio encargado de gestionar la preferencia de tema (Claro / Oscuro)
 * y sincronizar el estado con localStorage y el DOM.
 */
export class ThemeService {
    /** Clave de almacenamiento en localStorage */
    STORAGE_KEY = "app_theme_mode";
    /** Estado reactivo del tema actual */
    currentTheme;
    constructor() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");
        this.currentTheme = ref(initialTheme);
        this.applyTheme(initialTheme);
    }
    /**
     * Alterna entre el modo claro y oscuro.
     *
     * Returns:
     *     void
     */
    toggleTheme() {
        const newTheme = this.currentTheme.value === "light" ? "dark" : "light";
        this.currentTheme.value = newTheme;
        localStorage.setItem(this.STORAGE_KEY, newTheme);
        this.applyTheme(newTheme);
    }
    /**
     * Aplica la clase '.dark' al elemento raíz <html> según el tema seleccionado.
     *
     * Args:
     *     theme (ThemeMode): Tema a aplicar en el DOM.
     *
     * Returns:
     *     void
     */
    applyTheme(theme) {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
    }
}
export const themeService = new ThemeService();

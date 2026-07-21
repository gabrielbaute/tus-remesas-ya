import { ref, type Ref } from "vue";

/**
 * Tipo que define los temas soportados por la aplicación.
 */
export type ThemeMode = "light" | "dark";

/**
 * Servicio encargado de gestionar la preferencia de tema (Claro / Oscuro)
 * y sincronizar el estado con localStorage y el DOM.
 */
export class ThemeService {
  /** Clave de almacenamiento en localStorage */
  private readonly STORAGE_KEY: string = "app_theme_mode";

  /** Estado reactivo del tema actual */
  public currentTheme: Ref<ThemeMode>;

  public constructor() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme: ThemeMode = savedTheme ?? (prefersDark ? "dark" : "light");
    this.currentTheme = ref<ThemeMode>(initialTheme);
    
    this.applyTheme(initialTheme);
  }

  /**
   * Alterna entre el modo claro y oscuro.
   *
   * Returns:
   *     void
   */
  public toggleTheme(): void {
    const newTheme: ThemeMode = this.currentTheme.value === "light" ? "dark" : "light";
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
  private applyTheme(theme: ThemeMode): void {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
}

export const themeService = new ThemeService();
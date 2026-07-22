import { defineComponent } from "vue";
import { themeService } from "../../services/ThemeService";
/**
 * Botón flotante para alternar entre el modo Claro y Oscuro.
 */
export default defineComponent({
    name: "ThemeToggle",
    setup() {
        /**
         * Alterna el tema global utilizando el servicio de temas.
         *
         * Returns:
         *     void
         */
        const handleToggle = () => {
            themeService.toggleTheme();
        };
        return {
            currentTheme: themeService.currentTheme,
            handleToggle,
        };
    },
});

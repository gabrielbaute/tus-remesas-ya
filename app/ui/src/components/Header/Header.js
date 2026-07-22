import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
/**
 * Componente Header con estilo metálico y barra de navegación responsive.
 */
export default defineComponent({
    name: "HeaderComponent",
    setup() {
        const route = useRoute();
        const isMobileMenuOpen = ref(false);
        // Listado de rutas navegables de la aplicación
        const navItems = [
            { name: "home", path: "/", label: "Tablero" },
            { name: "history", path: "/history", label: "Histórico" },
            { name: "about", path: "/about", label: "Nosotros" },
        ];
        /**
         * Alterna el estado de visibilidad del menú en dispositivos móviles.
         *
         * Returns:
         *     void
         */
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        };
        /**
         * Verifica si la ruta proporcionada es la activa actualmente.
         *
         * Args:
         *     path (string): Ruta a verificar.
         *
         * Returns:
         *     boolean: Verdadero si coincide con la ruta activa.
         */
        const isActive = (path) => {
            return route.path === path;
        };
        return {
            navItems,
            isMobileMenuOpen,
            toggleMobileMenu,
            isActive,
        };
    },
});

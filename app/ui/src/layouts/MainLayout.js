import { defineComponent } from "vue";
import HeaderComponent from "../components/Header/Header.vue";
import FooterComponent from "../components/Footer/Footer.vue";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle.vue";
/**
 * Layout principal de la aplicación que integra el encabezado,
 * el contenido dinámico del router, el pie de página y el selector de tema.
 */
export default defineComponent({
    name: "MainLayout",
    components: {
        HeaderComponent,
        FooterComponent,
        ThemeToggle,
    },
});

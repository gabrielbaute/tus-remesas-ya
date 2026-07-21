import { defineComponent } from "vue";

/**
 * Componente Pie de Página con información legal y enlaces rápidos.
 */
export default defineComponent({
  name: "FooterComponent",
  setup() {
    const currentYear: number = new Date().getFullYear();

    return {
      currentYear,
    };
  },
});
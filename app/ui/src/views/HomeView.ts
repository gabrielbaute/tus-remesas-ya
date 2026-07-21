import { defineComponent, onMounted, ref, computed } from "vue";
import { arbitrageService, type FiatPairData, type TodayPenVesData } from "../services/ArbitrageService";
import RateCard from "../components/RateCard/RateCard.vue";
// Ruta corregida apuntando a la carpeta /Calculator/
import RemittanceCalculator from "../components/Calculator/RemittanceCalculator.vue";

/**
 * Vista principal (Tablero de Control) que gestiona la presentación de las tasas
 * fijadas para el cliente, referencias P2P y la calculadora interactiva.
 */
export default defineComponent({
  name: "HomeView",
  components: {
    RateCard,
    RemittanceCalculator,
  },
  setup() {
    /** Objeto reactivo con los precios P2P de los pares fiat */
    const pairData = ref<FiatPairData | null>(null);

    /** Objeto reactivo con las tasas oficiales diarias para clientes */
    const todayPenVesData = ref<TodayPenVesData | null>(null);

    /** Estado de carga global del tablero */
    const isLoading = ref<boolean>(true);

    /** Mensaje de error para notificar fallos en la red o API */
    const errorMessage = ref<string | null>(null);

    /**
     * Formatea la fecha ISO recibida en formato amigable DD/MM/YYYY.
     *
     * Returns:
     *     string: Fecha formateada o '---' si no hay registro válido.
     */
    const formattedDate = computed<string>(() => {
      const rawDate = pairData.value?.date;
      if (!rawDate) return "---";

      const dateObj = new Date(rawDate);
      return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(dateObj);
    });

    /**
     * Carga en paralelo los datos P2P y las tasas diarias de la API de arbitraje.
     *
     * Returns:
     *     Promise<void>: Promesa completada tras actualizar el estado reactivo.
     */
    const loadDashboardData = async (): Promise<void> => {
      isLoading.value = true;
      errorMessage.value = null;

      try {
        const [pairResult, todayResult] = await Promise.all([
          arbitrageService.fetchPair("VES", "PEN"),
          arbitrageService.fetchTodayPenVesPair(),
        ]);

        pairData.value = pairResult;
        todayPenVesData.value = todayResult;

        if (arbitrageService.error) {
          errorMessage.value = arbitrageService.error;
        }
      } catch (err) {
        errorMessage.value = "Ocurrió un error inesperado al cargar los datos del tablero.";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      void loadDashboardData();
    });

    return {
      pairData,
      todayPenVesData,
      isLoading,
      errorMessage,
      formattedDate,
      loadDashboardData,
    };
  },
});
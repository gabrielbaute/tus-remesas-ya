import { defineComponent, onMounted, ref, computed } from "vue";
import { arbitrageService, type FiatPairData, type TodayPenVesData } from "../services/ArbitrageService";
import RateCard from "../components/RateCard/RateCard.vue";

/**
 * Vista principal (Tablero) que consulta las tasas de cambio P2P y de remesas
 * y las renderiza utilizando tarjetas modulares.
 */
export default defineComponent({
  name: "HomeView",
  components: {
    RateCard,
  },
  setup() {
    const pairData = ref<FiatPairData | null>(null);
    const todayPenVesData = ref<TodayPenVesData | null>(null);
    const isLoading = ref<boolean>(true);
    const errorMessage = ref<string | null>(null);

    /**
     * Formatea la fecha ISO recibida en formato amigable DD/MM/YYYY.
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
     * Carga los datos desde los endpoints de la API de arbitraje.
     */
    const loadDashboardData = async (): Promise<void> => {
      isLoading.value = true;
      errorMessage.value = null;

      try {
        // Ejecutamos ambas consultas en paralelo
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
      loadDashboardData();
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
import { defineComponent, ref, computed, onMounted } from "vue";
import { calculatorService, type CalculationResult } from "../../services/CalculatorService";
import { arbitrageService, type TodayPenVesData } from "../../services/ArbitrageService";

/**
 * Componente interactivo para el cálculo de conversión de remesas
 * entre Soles Peruanos (PEN) y Bolívares Venezolanos (VES).
 */
export default defineComponent({
  name: "RemittanceCalculator",
  setup() {
    /** Monto numérico ingresado por el usuario */
    const amountInput = ref<number | null>(100);

    /** Dirección del flujo de envío: 'PEN_TO_VES' o 'VES_TO_PEN' */
    const direction = ref<"PEN_TO_VES" | "VES_TO_PEN">("PEN_TO_VES");

    /** Estado de carga mientras se obtienen las tasas actualizadas */
    const isLoading = ref<boolean>(true);

    /** Mensaje de error en caso de fallo en la petición de tasas */
    const errorMessage = ref<string | null>(null);

    /** Contenedor reactivo para los datos de la tasa del día */
    const todayRates = ref<TodayPenVesData | null>(null);

    /**
     * Obtiene de forma asíncrona las tasas del día desde el servicio de arbitraje.
     *
     * Returns:
     *     Promise<void>: Promesa vacía al finalizar la actualización del estado.
     */
    const fetchRates = async (): Promise<void> => {
      isLoading.value = true;
      errorMessage.value = null;
      try {
        const data = await arbitrageService.fetchTodayPenVesPair();
        todayRates.value = data;
      } catch (error) {
        errorMessage.value = "Error al obtener las tasas del día. Intente nuevamente.";
      } finally {
        isLoading.value = false;
      }
    };

    /**
     * Alterna la dirección del envío de PEN->VES a VES->PEN y viceversa.
     *
     * Returns:
     *     void
     */
    const toggleDirection = (): void => {
      direction.value = direction.value === "PEN_TO_VES" ? "VES_TO_PEN" : "PEN_TO_VES";
    };

    /**
     * Propiedad computada que ejecuta el cálculo de conversión según la dirección elegida.
     *
     * Returns:
     *     CalculationResult | null: Objeto con el resultado del cálculo o null si no se puede procesar.
     */
    const calculationResult = computed<CalculationResult | null>(() => {
      const amount = amountInput.value ?? 0;
      if (amount <= 0 || !todayRates.value) {
        return null;
      }

      if (direction.value === "PEN_TO_VES") {
        return calculatorService.calculatePenToVes(amount, todayRates.value);
      } else {
        return calculatorService.calculateVesToPen(amount, todayRates.value);
      }
    });

    /**
     * Formatea el texto explicativo de la tasa de cambio directa PEN/VES.
     *
     * Returns:
     *     string: Texto descriptivo de la tasa aplicada.
     */
    const formattedRateText = computed<string>(() => {
      const result = calculationResult.value;
      if (!result) return "";

      if (result.sourceCurrency === "PEN") {
        return `1 PEN = ${result.appliedRate.toFixed(4)} VES`;
      } else {
        return `1 PEN = ${result.appliedRate.toFixed(4)} VES`;
      }
    });

    /**
     * Propiedad computada que genera la URL con mensaje pre-redactado para WhatsApp.
     *
     * Returns:
     *     string: Enlace formateado listo para abrir en nueva pestaña.
     */
    const whatsappUrl = computed<string>(() => {
      const result = calculationResult.value;
      if (!result) {
        return "https://wa.me/+51952075851?text=Hola,%20quisiera%20consultar%20sobre%20el%20envío%20de%20remesas.";
      }

      const message =
        `Hola, deseo realizar una operación de remesa:\n` +
        `• Envío: ${result.amountSent} ${result.sourceCurrency}\n` +
        `• Recibo: ${result.amountReceived} ${result.targetCurrency}\n` +
        `• Tasa aplicada: ${formattedRateText.value}\n` +
        `¿Me indican los datos para proceder con el depósito?`;

      return `https://wa.me/+51952075851?text=${encodeURIComponent(message)}`;
    });

    onMounted(() => {
      void fetchRates();
    });

    return {
      amountInput,
      direction,
      isLoading,
      errorMessage,
      todayRates,
      calculationResult,
      formattedRateText,
      whatsappUrl,
      toggleDirection,
      fetchRates,
    };
  },
});
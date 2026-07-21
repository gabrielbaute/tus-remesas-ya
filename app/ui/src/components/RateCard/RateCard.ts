import { defineComponent, type PropType } from "vue";

/**
 * Componente modular para representar una métrica o tasa individual
 * con estilos metálicos, etiqueta de moneda/dirección y formato numérico.
 */
export default defineComponent({
  name: "RateCard",
  props: {
    /** Título o concepto de la tasa (ej. "USDT / VES") */
    title: {
      type: String,
      required: true,
    },
    /** Valor numérico de la tasa obtenido desde la API */
    value: {
      type: Number as PropType<number | null>,
      default: null,
    },
    /** Símbolo de la unidad o divisa a mostrar (ej. "Bs", "S/.", "VES/PEN") */
    unit: {
      type: String,
      default: "",
    },
    /** Descripción secundaria o subtítulo contextual */
    description: {
      type: String,
      default: "",
    },
    /** Subtexto descriptivo del tipo de operación (ej. "Binance P2P Buy", "Precio Cliente") */
    badgeText: {
      type: String,
      default: "",
    },
    /** Define el esquema de color del indicador metálico (cyan, emerald, amber, indigo) */
    accentColor: {
      type: String as PropType<"cyan" | "emerald" | "amber" | "indigo">,
      default: "cyan",
    },
  },
  setup() {
    /**
     * Formatea un número flotante a una representación monetaria con decimales legibles.
     *
     * Args:
     *     val (number | null): Valor numérico a formatear.
     *
     * Returns:
     *     string: Cadena formateada o "---" si el valor es nulo/indefinido.
     */
    const formatValue = (val: number | null): string => {
      if (val === null || val === undefined) return "---";

      // Si el número es mayor a 10, usamos 2 decimales; si es menor (ej. tasas pequeñas), usamos hasta 4.
      const decimals: number = val >= 10 ? 2 : 4;
      return new Intl.NumberFormat("es-PE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(val);
    };

    return {
      formatValue,
    };
  },
});
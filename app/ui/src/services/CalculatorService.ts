import type { TodayPenVesData } from "./ArbitrageService";

/**
 * Interfaz que define la respuesta detallada de una conversión de remesa.
 */
export interface CalculationResult {
  amountSent: number;
  amountReceived: number;
  appliedRate: number;
  sourceCurrency: "PEN" | "VES";
  targetCurrency: "VES" | "PEN";
}

/**
 * Servicio encargado de realizar los cálculos de conversión de remesas
 * para el corredor Perú ➔ Venezuela y viceversa.
 */
export class CalculatorService {
  /**
   * Calcula la cantidad de Bolívares (VES) a recibir dado un monto en Soles (PEN) a enviar.
   *
   * Ruta: Perú ➔ Venezuela.
   *
   * Args:
   *     penAmount (number): Monto en Soles que el cliente desea enviar.
   *     rates (TodayPenVesData | null): Objeto con las tasas del día.
   *
   * Returns:
   *     CalculationResult | null: Resultado con el monto procesado, o null si los datos no son válidos.
   */
  public calculatePenToVes(
    penAmount: number,
    rates: TodayPenVesData | null
  ): CalculationResult | null {
    if (!rates || !rates.peru_to_ven_customer_price || penAmount <= 0) {
      return null;
    }

    const rate: number = rates.peru_to_ven_customer_price;
    const vesAmount: number = penAmount * rate;

    return {
      amountSent: penAmount,
      amountReceived: Number(vesAmount.toFixed(2)),
      appliedRate: rate,
      sourceCurrency: "PEN",
      targetCurrency: "VES",
    };
  }

  /**
   * Calcula la cantidad de Soles (PEN) a recibir dado un monto en Bolívares (VES) a enviar.
   *
   * Ruta: Venezuela ➔ Perú.
   *
   * Args:
   *     vesAmount (number): Monto en Bolívares que el cliente desea enviar.
   *     rates (TodayPenVesData | null): Objeto con las tasas del día.
   *
   * Returns:
   *     CalculationResult | null: Resultado con el monto procesado, o null si los datos no son válidos.
   */
  public calculateVesToPen(
    vesAmount: number,
    rates: TodayPenVesData | null
  ): CalculationResult | null {
    if (!rates || !rates.ven_to_peru_customer_price || vesAmount <= 0) {
      return null;
    }

    const rate: number = rates.ven_to_peru_customer_price;
    const penAmount: number = vesAmount / rate;

    return {
      amountSent: vesAmount,
      amountReceived: Number(penAmount.toFixed(2)),
      appliedRate: rate,
      sourceCurrency: "VES",
      targetCurrency: "PEN",
    };
  }
}

export const calculatorService = new CalculatorService();
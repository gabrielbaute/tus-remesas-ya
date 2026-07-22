import client from "../api/client";
/**
 * Servicio encargado de gestionar las peticiones a la API de arbitraje y remesas.
 * Mantiene el estado interno de los pares de cambio y tasas para el corredor VES - PEN.
 */
export class ArbitrageService {
    /** Estado del libro de órdenes P2P y tipos de cambio para el par fiat */
    pairData = null;
    /** Estado de las tasas de arbitraje calculadas para el cliente */
    todayPenVesData = null;
    /** Indica si hay alguna petición en proceso */
    isLoading = false;
    /** Almacena el mensaje de error en caso de fallo en alguna petición */
    error = null;
    /**
     * Obtiene el par de cambio FIAT P2P desde el backend.
     * Por defecto fija el corredor entre Venezuela (VES) y Perú (PEN).
     *
     * Args:
     *     fiat1 (FiatCurrency): Moneda fiat origen. Por defecto "VES".
     *     fiat2 (FiatCurrency): Moneda fiat destino. Por defecto "PEN".
     *
     * Returns:
     *     Promise<FiatPairData | null>: Datos del par obtenido o null en caso de error.
     */
    async fetchPair(fiat1 = "VES", fiat2 = "PEN") {
        this.isLoading = true;
        this.error = null;
        try {
            const { data, error } = await client.GET("/api/v1/arbitrage/pair", {
                params: {
                    query: {
                        fiat_1: fiat1,
                        fiat_2: fiat2,
                    },
                },
            });
            if (error) {
                this.error = "Error al consultar el par de divisas.";
                return null;
            }
            this.pairData = data;
            return data;
        }
        catch (err) {
            this.error =
                err instanceof Error ? err.message : "Error de red desconocido.";
            return null;
        }
        finally {
            this.isLoading = false;
        }
    }
    /**
     * Obtiene las tasas de arbitraje actuales ajustadas con el margen de ganancia de la agencia.
     *
     * Args:
     *     reveneuRate (number, opcional): Tasa de comisión o ganancia de la agencia.
     *
     * Returns:
     *     Promise<TodayPenVesData | null>: Tasas de adquisición y precios al cliente.
     */
    async fetchTodayPenVesPair(reveneuRate) {
        this.isLoading = true;
        this.error = null;
        try {
            const { data, error } = await client.GET("/api/v1/arbitrage/today_pen_ves_pair", {
                params: {
                    query: {
                        reveneu_rate: reveneuRate,
                    },
                },
            });
            if (error) {
                this.error = "Error al consultar las tasas del día para PEN/VES.";
                return null;
            }
            this.todayPenVesData = data;
            return data;
        }
        catch (err) {
            this.error =
                err instanceof Error ? err.message : "Error de red desconocido.";
            return null;
        }
        finally {
            this.isLoading = false;
        }
    }
}
// Exportamos una instancia única (Singleton) para compartir el estado si es necesario
export const arbitrageService = new ArbitrageService();

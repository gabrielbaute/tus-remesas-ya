import createClient from "openapi-fetch";
import type { paths } from "./schema.d";

// Si VITE_API_URL está vacío (producción), se usa el host relativo del navegador
const apiBaseUrl = import.meta.env.VITE_API_URL || window.location.origin;

/**
 * Cliente de API tipado según el esquema OpenAPI.
 */
const client = createClient<paths>({
  baseUrl: apiBaseUrl,
});

export default client;
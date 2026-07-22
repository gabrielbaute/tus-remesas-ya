import createClient from "openapi-fetch";
// Si VITE_API_URL está vacío (producción), se usa el host relativo del navegador
const apiBaseUrl = import.meta.env.VITE_API_URL || window.location.origin;
// const apiBaseUrl = import.meta.env.VITE_API_URL || "";
/**
 * Cliente de API tipado según el esquema OpenAPI.
 */
const client = createClient({
    baseUrl: apiBaseUrl,
});
export default client;

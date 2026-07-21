/**
 * Declaración global de módulo para permitir la importación de componentes Single File Component (.vue)
 * en archivos de código TypeScript (.ts).
 */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
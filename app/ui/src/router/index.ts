import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

// Definición de las rutas principales de la aplicación
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    // Carga perezosa (lazy-loading) para optimizar el rendimiento
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/HistoryView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

/**
 * Instancia del enrutador principal de la aplicación.
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
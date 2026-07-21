import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

// Registramos el módulo de navegación
app.use(router);

app.mount("#app");
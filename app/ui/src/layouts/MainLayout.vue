<!-- Layout Principal de la Aplicación -->
<template>
  <!-- Contenedor raíz con fondo oscuro metálico profundo estilo titanio -->
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
    
    <!-- Encabezado modular -->
    <HeaderComponent />

    <!-- Área de contenido dinámico para las vistas -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Pie de página modular -->
    <FooterComponent />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "../components/Header/Header.vue";
import FooterComponent from "../components/Footer/Footer.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    HeaderComponent,
    FooterComponent,
  },
});
</script>
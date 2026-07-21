<!-- Layout Principal de la Aplicación con tokens semánticos -->
<template>
  <!-- Contenedor raíz: Fondo principal de alto contraste y texto claro con selección en color primario -->
  <div class="min-h-screen flex flex-col bg-bg-main text-text-main font-sans antialiased selection:bg-primary selection:text-text-inverse">
    
    <!-- Encabezado modular -->
    <HeaderComponent />

    <!-- Área de contenido dinámico para las vistas -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Pie de página modular -->
    <FooterComponent />

    <!-- Selector de Tema Flotante (Light / Dark) -->
    <ThemeToggle />

  </div>
</template>

<script lang="ts" src="./MainLayout.ts"></script>
<!-- Componente Pie de Página de la Aplicación con tokens semánticos -->
<template>
  <!-- Pie de página con fondo elevado y borde superior en tono neutro de estructura -->
  <footer class="bg-bg-card border-t border-border-main text-text-muted text-sm py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Descripción y Copyright con acento institucional -->
        <div class="text-center md:text-left">
          <p class="font-semibold text-text-main">
            Monitor de Arbitraje & Remesas <span class="text-primary">VES/PEN</span>
          </p>
          <p class="text-xs text-text-muted/80 mt-1">
            &copy; {{ currentYear }} Todos los derechos reservados. Datos sincronizados desde Binance P2P & BCV.
          </p>
        </div>

        <!-- Indicador de estado del sistema usando color semántico success -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elevated border border-border-main shadow-inner">
          <span class="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
          <span class="text-xs font-mono text-text-main">API Conectada</span>
        </div>

      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./Footer.ts"></script>
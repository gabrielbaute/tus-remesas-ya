<!-- Componente Pie de Página de la Aplicación -->
<template>
  <!-- Pie de página con acabado en degradado titanio oscuro y borde superior -->
  <footer class="bg-gradient-to-b from-slate-900 to-zinc-950 border-t border-slate-800 text-slate-400 text-sm py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Descripción y Copyright -->
        <div class="text-center md:text-left">
          <p class="font-medium text-slate-300">
            Monitor de Arbitraje & Remesas VES/PEN
          </p>
          <p class="text-xs text-slate-500 mt-1">
            &copy; {{ currentYear }} Todos los derechos reservados. Datos sincronizados desde Binance P2P & BCV.
          </p>
        </div>

        <!-- Indicador de estado del sistema -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-inner">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-xs font-mono text-slate-300">API Conectada</span>
        </div>

      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./Footer.ts"></script>
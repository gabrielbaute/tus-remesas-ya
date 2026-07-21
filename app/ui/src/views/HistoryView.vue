<!-- Vista: Histórico de Cotizaciones y Gráficas -->
<template>
  <div class="space-y-8">
    
    <!-- Encabezado de la Sección -->
    <div class="border-b border-slate-800 pb-5">
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
        Histórico de Cotizaciones
      </h1>
      <p class="text-slate-400 text-sm mt-1">
        Evolución temporal y tendencias de los pares de cambio VES y PEN en Binance P2P.
      </p>
    </div>

    <!-- Contenedor Maqueta para la Gráfica -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-zinc-950 p-8 border border-slate-700/60 shadow-xl shadow-black/30 backdrop-blur-sm space-y-6">
      
      <!-- Controles visuales simulados (Filtros de Fecha / Par) -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono text-slate-400 uppercase">Filtrar Par:</span>
          <div class="px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-cyan-400">
            VES / USDT
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700">7D</span>
          <span class="px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700">1M</span>
          <span class="px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700">3M</span>
        </div>
      </div>

      <!-- Placeholder visual de la Gráfica -->
      <div class="h-72 w-full bg-slate-950/60 rounded-xl border border-slate-800 border-dashed flex flex-col items-center justify-center gap-3 text-slate-500">
        <div class="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-cyan-400 font-mono text-lg">
          📈
        </div>
        <p class="text-sm font-medium text-slate-400">
          Módulo de Gráficas Históricas en Maquetación
        </p>
        <span class="text-xs text-slate-600 max-w-sm text-center">
          Próximamente conectaremos esta sección con el servicio de histórico para procesar la API.
        </span>
      </div>

    </div>

  </div>
</template>

<script lang="ts" src="./HistoryView.ts"></script>
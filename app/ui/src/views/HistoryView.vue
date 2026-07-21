<!-- Vista: Histórico de Cotizaciones y Gráficas estilizado con tokens semánticos -->
<template>
  <div class="space-y-8">
    
    <!-- Encabezado de la Sección -->
    <div class="border-b border-border-main pb-5">
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-text-main">
        Histórico de <span class="text-primary">Cotizaciones</span>
      </h1>
      <p class="text-text-muted text-sm mt-1">
        Evolución temporal y tendencias de los pares de cambio VES y PEN en Binance P2P.
      </p>
    </div>

    <!-- Contenedor Maqueta para la Gráfica -->
    <div class="relative overflow-hidden rounded-2xl bg-bg-card p-8 border border-border-main shadow-xl shadow-black/40 space-y-6">
      
      <!-- Controles visuales simulados (Filtros de Fecha / Par) -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-border-main pb-4">
        <!-- Selector/Filtro activo de par -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono text-text-muted uppercase font-semibold">Filtrar Par:</span>
          <div class="px-3 py-1 bg-bg-main border border-primary/50 rounded-lg text-xs font-bold text-primary">
            VES / USDT
          </div>
        </div>
        
        <!-- Rango de tiempo seleccionado -->
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-xs font-mono text-text-main bg-bg-elevated rounded-md border border-border-main font-semibold cursor-pointer hover:border-primary/50 transition-colors">7D</span>
          <span class="px-2.5 py-1 text-xs font-mono text-text-main bg-bg-elevated rounded-md border border-border-main font-semibold cursor-pointer hover:border-primary/50 transition-colors">1M</span>
          <span class="px-2.5 py-1 text-xs font-mono text-text-main bg-bg-elevated rounded-md border border-border-main font-semibold cursor-pointer hover:border-primary/50 transition-colors">3M</span>
        </div>
      </div>

      <!-- Placeholder visual de la Gráfica -->
      <div class="h-72 w-full bg-bg-main rounded-xl border border-border-main border-dashed flex flex-col items-center justify-center gap-3 text-text-muted">
        <!-- Icono decorativo de la maqueta de gráfica -->
        <div class="w-12 h-12 rounded-full bg-bg-card flex items-center justify-center border border-border-main text-primary font-mono text-lg shadow-inner">
          📈
        </div>
        <!-- Título del indicador de maqueta -->
        <p class="text-sm font-bold text-text-main">
          Módulo de Gráficas Históricas en Maquetación
        </p>
        <!-- Mensaje de estado para la integración de API -->
        <span class="text-xs text-text-muted max-w-sm text-center">
          Próximamente conectaremos esta sección con el servicio de histórico para procesar la API.
        </span>
      </div>

    </div>

  </div>
</template>

<script lang="ts" src="./HistoryView.ts"></script>
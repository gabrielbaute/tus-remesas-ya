<!-- Tarjeta modular metálica para mostrar indicadores de tasa -->
<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-zinc-950 p-6 border border-slate-700/60 shadow-xl shadow-black/30 backdrop-blur-sm hover:border-slate-500/50 transition-all duration-300 group"
  >
    <!-- Brillo sutil de fondo metálico -->
    <div
      class="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-slate-700/10 blur-2xl group-hover:bg-slate-500/20 transition-all duration-500"
    ></div>

    <!-- Encabezado de la Tarjeta: Título y Badge -->
    <div class="flex items-start justify-between gap-2 mb-4">
      <div>
        <!-- Título de la Métrica -->
        <h3 class="text-xs uppercase tracking-wider font-semibold text-slate-400">
          {{ title }}
        </h3>
        <!-- Subtítulo o descripción corta -->
        <p v-if="description" class="text-[11px] text-slate-500 mt-0.5">
          {{ description }}
        </p>
      </div>

      <!-- Badge con tipo de fuente o mercado -->
      <span
        v-if="badgeText"
        :class="[
          'text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border font-semibold tracking-wide',
          accentColor === 'cyan' ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800/50' : '',
          accentColor === 'emerald' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50' : '',
          accentColor === 'amber' ? 'bg-amber-950/60 text-amber-400 border-amber-800/50' : '',
          accentColor === 'indigo' ? 'bg-indigo-950/60 text-indigo-400 border-indigo-800/50' : ''
        ]"
      >
        {{ badgeText }}
      </span>
    </div>

    <!-- Valor Principal y Unidad -->
    <div class="flex items-baseline gap-2 mt-2">
      <!-- Muestra de valor numérico con degradado brillante -->
      <span
        class="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 font-mono"
      >
        {{ formatValue(value) }}
      </span>

      <!-- Unidad / Moneda -->
      <span v-if="unit" class="text-sm font-semibold text-slate-400 font-mono">
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./RateCard.ts"></script>
<!-- Tarjeta modular para mostrar indicadores de tasa refactorizada con tokens semánticos -->
<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-bg-card p-6 border border-border-main shadow-xl shadow-black/40 hover:border-primary/50 transition-all duration-300 group"
  >
    <!-- Brillo sutil de fondo en el acento primario al hacer hover -->
    <div
      class="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/15 transition-all duration-500"
    ></div>

    <!-- Encabezado de la Tarjeta: Título y Badge -->
    <div class="flex items-start justify-between gap-2 mb-4">
      <div>
        <!-- Título de la Métrica -->
        <h3 class="text-xs uppercase tracking-wider font-bold text-text-muted">
          {{ title }}
        </h3>
        <!-- Subtítulo o descripción corta -->
        <p v-if="description" class="text-[11px] text-text-muted/80 mt-0.5">
          {{ description }}
        </p>
      </div>

      <!-- Badge con tipo de fuente, mercado o tipo de operación -->
      <span
        v-if="badgeText"
        :class="[
          'text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border font-bold tracking-wide',
          accentColor === 'cyan' || accentColor === 'amber' ? 'bg-primary/10 text-primary border-primary/30' : '',
          accentColor === 'emerald' ? 'bg-success/10 text-success border-success/30' : '',
          accentColor === 'indigo' ? 'bg-bg-elevated text-text-muted border-border-main' : ''
        ]"
      >
        {{ badgeText }}
      </span>
    </div>

    <!-- Valor Principal y Unidad -->
    <div class="flex items-baseline gap-2 mt-2">
      <!-- Muestra de valor numérico destacado en texto principal / tipografía mono -->
      <span
        class="text-3xl sm:text-4xl font-black tracking-tight text-text-main font-mono"
      >
        {{ formatValue(value) }}
      </span>

      <!-- Unidad / Moneda destacada en color primario corporativo -->
      <span v-if="unit" class="text-sm font-bold text-primary font-mono">
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./RateCard.ts"></script>
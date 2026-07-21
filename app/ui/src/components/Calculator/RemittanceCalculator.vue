<!-- Componente: Calculadora de Remesas Perú - Venezuela -->
<template>
  <div class="w-full max-w-xl mx-auto rounded-2xl bg-bg-card p-6 sm:p-8 border border-border-main shadow-xl space-y-6">
    
    <!-- Encabezado de la Calculadora -->
    <div class="flex items-center justify-between border-b border-border-main pb-4">
      <div>
        <h2 class="text-xl font-bold text-text-main flex items-center gap-2">
          <span class="text-primary">🧮</span> Calculadora de Remesa
        </h2>
        <p class="text-xs text-text-muted mt-0.5">
          Calcula tu envío en tiempo real con las mejores tasas.
        </p>
      </div>

      <!-- Indicador de carga de tasas -->
      <button 
        @click="fetchRates" 
        :disabled="isLoading" 
        class="p-2 text-text-muted hover:text-primary transition-colors disabled:opacity-50"
        title="Actualizar tasas"
      >
        <span :class="{ 'animate-spin inline-block': isLoading }">🔄</span>
      </button>
    </div>

    <!-- Mensaje de Error si falla la API de tasas -->
    <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-500 flex items-center justify-between">
      <span>{{ errorMessage }}</span>
      <button @click="fetchRates" class="underline font-bold hover:text-red-700">Reintentar</button>
    </div>

    <!-- Formulario e Interacción de Conversión -->
    <div class="space-y-4">
      
      <!-- Entrada: Monto a Enviar -->
      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider">
          Tú envías
        </label>
        <div class="relative flex items-center">
          <input
            v-model.number="amountInput"
            type="number"
            min="1"
            placeholder="Monto a enviar"
            class="w-full bg-bg-main border border-border-main rounded-xl px-4 py-3.5 text-text-main text-lg font-mono font-bold focus:outline-none focus:border-border-focus transition-all pr-20"
          />
          <span class="absolute right-4 font-mono font-bold text-text-main text-sm bg-bg-elevated px-2.5 py-1 rounded-lg border border-border-main">
            {{ direction === 'PEN_TO_VES' ? 'PEN (S/)' : 'VES (Bs)' }}
          </span>
        </div>
      </div>

      <!-- Botón Selector de Alternancia de Dirección -->
      <div class="flex justify-center -my-2 relative z-10">
        <button
          @click="toggleDirection"
          type="button"
          class="bg-bg-elevated hover:bg-border-main border border-border-main p-2.5 rounded-full text-text-main hover:scale-110 active:scale-95 transition-all shadow-md"
          title="Cambiar dirección de conversión"
        >
          <!-- SVG Icono de Flechas Cruzadas / Permutación -->
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
          </svg>
        </button>
      </div>

      <!-- Salida: Monto estimado a Recibir -->
      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider">
          El destinatario recibe (Aproximado)
        </label>
        <div class="relative flex items-center">
          <input
            :value="calculationResult ? calculationResult.amountReceived : '0.00'"
            type="text"
            readonly
            class="w-full bg-bg-main/60 border border-border-main/60 rounded-xl px-4 py-3.5 text-text-main text-lg font-mono font-bold focus:outline-none cursor-not-allowed pr-20"
          />
          <span class="absolute right-4 font-mono font-bold text-text-main text-sm bg-bg-elevated px-2.5 py-1 rounded-lg border border-border-main">
            {{ direction === 'PEN_TO_VES' ? 'VES (Bs)' : 'PEN (S/)' }}
          </span>
        </div>
      </div>

    </div>

    <!-- Desglose de Detalle de Tasa Aplicada (Sin comisión engañosa ni referencias erróneas a USDT) -->
    <div v-if="calculationResult" class="p-4 rounded-xl bg-bg-main border border-border-main font-mono text-xs">
      <div class="flex items-center justify-between text-text-muted">
        <span>Tasa de cambio aplicada:</span>
        <span class="text-text-main font-bold">
          {{ formattedRateText }}
        </span>
      </div>
    </div>

    <!-- Botón de Acción Directa: Iniciar Operación vía WhatsApp -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-success hover:bg-success/90 text-text-inverse font-bold text-base rounded-xl transition-all shadow-lg border border-success/50"
    >
      <!-- SVG Icono WhatsApp -->
      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      Procesar Operación por WhatsApp
    </a>

  </div>
</template>

<script lang="ts" src="./RemittanceCalculator.ts"></script>
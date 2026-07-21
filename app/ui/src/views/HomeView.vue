<!-- Vista Principal: Tablero de Control, Tasas Cliente y Calculadora -->
<template>
  <div class="space-y-10">
    
    <!-- Encabezado del Tablero con Titular y Badges de Referencia Rápidos P2P -->
    <div class="space-y-4 border-b border-border-main pb-6">
      
      <!-- Fila Superior: Título y Fecha de Registro -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-text-main">
            Tasa del <span class="text-primary">Día</span>
          </h1>
          <p class="text-text-muted text-sm mt-1">
            Cotizaciones transparentes fijadas para el envío directo de remesas.
          </p>
        </div>

        <!-- Tarjeta con la fecha de la última actualización almacenada -->
        <div class="flex items-center gap-3 bg-bg-card border border-border-main px-4 py-2 rounded-xl text-xs font-mono text-text-main self-start sm:self-auto shadow-sm">
          <span class="text-text-muted">Último Registro:</span>
          <span class="text-primary font-bold">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- Fila Inferior: Badges de Referencia P2P USDT (Compactos) -->
      <div class="flex flex-wrap items-center gap-3 pt-1">
        <!-- Comentario: Etiqueta descriptiva para el bloque de referencias Binance P2P -->
        <span class="text-xs font-mono text-text-muted uppercase tracking-wider font-semibold">
          Referencia P2P Binance:
        </span>

        <!-- Badge Referencia: USDT / VES -->
        <div class="inline-flex items-center gap-2 bg-bg-card border border-border-main px-3 py-1.5 rounded-lg text-xs font-mono">
          <span class="text-text-muted">USDT/VES:</span>
          <span v-if="isLoading" class="animate-pulse text-text-muted">...</span>
          <span v-else class="font-bold text-primary">
            {{ pairData?.fiat_1_p2p_buy?.average_price ? `${formatPrice(pairData.fiat_1_p2p_buy.average_price, 2)} Bs` : 'N/A' }}
          </span>
        </div>

        <!-- Badge Referencia: USDT / PEN -->
        <div class="inline-flex items-center gap-2 bg-bg-card border border-border-main px-3 py-1.5 rounded-lg text-xs font-mono">
          <span class="text-text-muted">USDT/PEN:</span>
          <span v-if="isLoading" class="animate-pulse text-text-muted">...</span>
          <span v-else class="font-bold text-success">
            {{ pairData?.fiat_2_p2p_buy?.average_price ? `${formatPrice(pairData.fiat_2_p2p_buy.average_price, 2)} S/.` : 'N/A' }}
          </span>
        </div>
      </div>

    </div>

    <!-- Estado de Carga (Skeleton/Spinner) -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      <div v-for="i in 2" :key="i" class="h-40 bg-bg-card rounded-2xl border border-border-main"></div>
    </div>

    <!-- Estado de Error -->
    <div v-else-if="errorMessage" class="p-6 bg-red-950/40 border border-red-800/60 rounded-2xl text-center space-y-3">
      <p class="text-red-400 text-sm font-medium">{{ errorMessage }}</p>
      <button 
        @click="loadDashboardData" 
        class="px-4 py-2 text-xs bg-bg-elevated hover:bg-border-main text-primary font-bold rounded-lg border border-border-main transition-all"
      >
        Reintentar Petición
      </button>
    </div>

    <!-- Rejilla de Tarjetas de Tasas Exclusivas para Cliente -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Card 1: Remesas PERÚ -> VZLA (Precio Cliente) -->
      <RateCard
        title="Remesas PERÚ ➔ VZLA"
        description="Tasa final aplicada por Sol enviado"
        :value="todayPenVesData?.peru_to_ven_customer_price ?? null"
        unit="VES/PEN"
        badgeText="Cliente"
        accentColor="amber"
      />

      <!-- Card 2: Remesas VZLA -> PERÚ (Precio Cliente) -->
      <RateCard
        title="Remesas VZLA ➔ PERÚ"
        description="Tasa final aplicada por Bolívar enviado"
        :value="todayPenVesData?.ven_to_peru_customer_price ?? null"
        unit="VES/PEN"
        badgeText="Cliente"
        accentColor="indigo"
      />

    </div>

    <!-- Sección de la Calculadora Interactivas de Remesas -->
    <div class="pt-4 border-t border-border-main/60">
      <RemittanceCalculator />
    </div>

  </div>
</template>

<script lang="ts" src="./HomeView.ts"></script>
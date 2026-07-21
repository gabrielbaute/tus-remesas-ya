<!-- Vista Principal: Tablero de Control de Tasas y Remesas -->
<template>
  <div class="space-y-8">
    
    <!-- Encabezado del Tablero con la fecha formateada -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
          Tablero de Cotizaciones
        </h1>
        <p class="text-slate-400 text-sm mt-1">
          Monitor oficial de tipos de cambio P2P y tasas de remesas para el corredor Venezuela — Perú.
        </p>
      </div>

      <!-- Tarjeta con la fecha de la última actualización almacenada -->
      <div class="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 self-start sm:self-auto">
        <span class="text-slate-500">Último Registro:</span>
        <span class="text-cyan-400 font-bold">{{ formattedDate }}</span>
      </div>
    </div>

    <!-- Estado de Carga (Skeleton/Spinner) -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      <div v-for="i in 4" :key="i" class="h-36 bg-slate-800/50 rounded-2xl border border-slate-800"></div>
    </div>

    <!-- Estado de Error -->
    <div v-else-if="errorMessage" class="p-6 bg-red-950/40 border border-red-800/50 rounded-2xl text-center space-y-3">
      <p class="text-red-400 text-sm font-medium">{{ errorMessage }}</p>
      <button 
        @click="loadDashboardData" 
        class="px-4 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition-all"
      >
        Reintentar Petición
      </button>
    </div>

    <!-- Rejilla de las 4 Tarjetas de Tasas Requeridas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Card 1: USDT Compra en Bs (USDT/VES) -->
      <RateCard
        title="USDT / VES"
        description="Precio de compra P2P Binance"
        :value="pairData?.fiat_1_p2p_buy?.average_price ?? null"
        unit="Bs"
        badgeText="Binance BUY"
        accentColor="cyan"
      />

      <!-- Card 2: USDT Compra en Soles (USDT/PEN) -->
      <RateCard
        title="USDT / PEN"
        description="Precio de compra P2P Binance"
        :value="pairData?.fiat_2_p2p_buy?.average_price ?? null"
        unit="S/."
        badgeText="Binance BUY"
        accentColor="emerald"
      />

      <!-- Card 3: Remesas VZLA -> PERÚ (Precio Cliente) -->
      <RateCard
        title="Remesas VZLA ➔ PERÚ"
        description="Tasa final fijada para el cliente"
        :value="todayPenVesData?.ven_to_peru_customer_price ?? null"
        unit="VES/PEN"
        badgeText="Cliente"
        accentColor="amber"
      />

      <!-- Card 4: Remesas PERÚ -> VZLA (Precio Cliente) -->
      <RateCard
        title="Remesas PERÚ ➔ VZLA"
        description="Tasa final fijada para el cliente"
        :value="todayPenVesData?.peru_to_ven_customer_price ?? null"
        unit="VES/PEN"
        badgeText="Cliente"
        accentColor="indigo"
      />

    </div>

  </div>
</template>

<script lang="ts" src="./HomeView.ts"></script>
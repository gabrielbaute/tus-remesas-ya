<!-- Vista: Sobre Nosotros y Información de Contacto -->
<template>
  <div class="max-w-4xl mx-auto space-y-8">
    
    <!-- Encabezado -->
    <div class="border-b border-slate-800 pb-5 text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
        Sobre la Plataforma
      </h1>
      <p class="text-slate-400 text-sm mt-1">
        Soluciones financieras y monitoreo transparente de tasas para el corredor de remesas Perú — Venezuela.
      </p>
    </div>

    <!-- Sección Informativa principal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Card: Nuestra Propuesta -->
      <div class="rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-zinc-950 p-6 border border-slate-700/60 shadow-xl shadow-black/30 space-y-3">
        <h2 class="text-lg font-bold text-slate-200 flex items-center gap-2">
          <span class="text-cyan-400">⚡</span> Monitoreo en Tiempo Real
        </h2>
        <p class="text-sm text-slate-400 leading-relaxed">
          Nuestra infraestructura consulta diariamente los indicadores oficiales de las entidades bancarias y los mercados P2P más importantes, garantizando un cálculo transparente y justo para el envío y recepción de fondos.
        </p>
      </div>

      <!-- Card: Contacto y Agencias -->
      <div class="rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-zinc-950 p-6 border border-slate-700/60 shadow-xl shadow-black/30 space-y-3">
        <h2 class="text-lg font-bold text-slate-200 flex items-center gap-2">
          <span class="text-cyan-400">📞</span> Atención al Cliente
        </h2>
        <p class="text-sm text-slate-400 leading-relaxed">
          ¿Tienes dudas o necesitas atención personalizada para operaciones de alto volumen? Ponte en contacto con nuestros asesores autorizados.
        </p>
        <div class="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-300">
          <div class="flex items-center gap-2">
            <span class="text-slate-500">Soporte:</span>
            <span class="text-cyan-400">contacto@remesas-ves-pen.com</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-slate-500">Horario:</span>
            <span>Lun - Sáb: 8:00 AM - 8:00 PM (Hora Lima)</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts" src="./AboutView.ts"></script>
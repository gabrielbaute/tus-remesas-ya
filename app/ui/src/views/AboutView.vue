<!-- Vista: Sobre Nosotros e Información de Contacto con tokens semánticos -->
<template>
  <div class="max-w-4xl mx-auto space-y-8">
    
    <!-- Encabezado de la página -->
    <div class="border-b border-border-main pb-5 text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-text-main">
        Sobre la <span class="text-primary">Plataforma</span>
      </h1>
      <p class="text-text-muted text-sm mt-1">
        Soluciones financieras y monitoreo transparente de tasas para el corredor de remesas Perú — Venezuela.
      </p>
    </div>

    <!-- Sección Informativa principal en dos columnas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Card: Nuestra Propuesta de Valor -->
      <div class="rounded-2xl bg-bg-card p-6 border border-border-main shadow-xl shadow-black/40 space-y-4">
        <h2 class="text-lg font-bold text-text-main flex items-center gap-2">
          <span class="text-primary">⚡</span> Monitoreo en Tiempo Real
        </h2>
        <p class="text-sm text-text-muted leading-relaxed">
          Nuestra infraestructura consulta diariamente los indicadores oficiales de las entidades bancarias y los mercados P2P más importantes, garantizando un cálculo transparente y justo para el envío y recepción de fondos.
        </p>
      </div>

      <!-- Card: Contacto Directo y Atención -->
      <div class="rounded-2xl bg-bg-card p-6 border border-border-main shadow-xl shadow-black/40 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <h2 class="text-lg font-bold text-text-main flex items-center gap-2">
            <span class="text-primary">📞</span> Atención al Cliente
          </h2>
          <p class="text-sm text-text-muted leading-relaxed">
            ¿Tienes dudas o necesitas atención personalizada para operaciones de alto volumen? Ponte en contacto directo con nuestros asesores.
          </p>
          
          <!-- Datos adicionales de soporte y horario -->
          <div class="pt-2 flex flex-col gap-1.5 text-xs font-mono text-text-main">
            <div class="flex items-center gap-2">
              <span class="text-text-muted">Soporte:</span>
              <span class="text-primary">contacto@remesas-ves-pen.com</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-text-muted">Horario:</span>
              <span>Lun - Sáb: 8:00 AM - 8:00 PM (Hora Lima)</span>
            </div>
          </div>
        </div>

        <!-- Botón de Acción Principal: Contacto Directo por WhatsApp -->
        <div class="pt-4">
          <a
            :href="whatsappContactUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-success hover:bg-success/90 text-text-main font-bold text-sm rounded-xl transition-all shadow-lg border border-success/50"
          >
            <!-- SVG Icono WhatsApp -->
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>

    </div>

    <!-- Sección de Redes Sociales y Comunidad -->
    <div class="rounded-2xl bg-bg-card p-6 border border-border-main shadow-xl text-center space-y-4">
      <div>
        <h3 class="text-base font-bold text-text-main">Únete a nuestras comunidades</h3>
        <p class="text-xs text-text-muted mt-1">Sigue nuestras redes para enterarte de actualizaciones de la tasa en tiempo real y noticias.</p>
      </div>

      <!-- Enlaces a redes sociales -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        
        <!-- Enlace: Canal de WhatsApp -->
        <a
          :href="socialLinks.whatsappChannel"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 bg-bg-elevated hover:bg-border-main text-text-main border border-border-main rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
        >
          <span class="text-success">📢</span> Canal WhatsApp
        </a>

        <!-- Enlace: Instagram -->
        <a
          :href="socialLinks.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 bg-bg-elevated hover:bg-border-main text-text-main border border-border-main rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
        >
          <span class="text-pink-400">📷</span> Instagram
        </a>

        <!-- Enlace: TikTok -->
        <a
          :href="socialLinks.tiktok"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 bg-bg-elevated hover:bg-border-main text-text-main border border-border-main rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
        >
          <span class="text-primary">🎵</span> TikTok
        </a>

      </div>
    </div>

  </div>
</template>

<script lang="ts" src="./AboutView.ts"></script>
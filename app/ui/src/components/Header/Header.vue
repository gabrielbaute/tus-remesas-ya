<!-- Componente Encabezado de Navegación Principal -->
<template>
  <!-- Barra superior con fondo metálico oscuro y borde brillante sutil -->
  <header class="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900 border-b border-slate-700/60 shadow-lg shadow-black/40 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Marca y Logotipo con acabado cromo/titanio -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-3 group">
            <!-- Icono decorativo con degradado metálico brillante -->
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-600 via-slate-300 to-zinc-500 p-[1px] shadow-md group-hover:shadow-cyan-500/20 transition-all">
              <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 font-black text-xl">⇄</span>
              </div>
            </div>
            <!-- Nombre de la plataforma -->
            <span class="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
              REMESAS<span class="text-cyan-400 font-extrabold">VES-PEN</span>
            </span>
          </router-link>
        </div>

        <!-- Navegación Escritorio -->
        <nav class="hidden md:flex items-center space-x-2">
          <!-- Bucle para renderizar los enlaces de navegación -->
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border',
              isActive(item.path)
                ? 'bg-gradient-to-r from-slate-700 to-zinc-800 text-cyan-400 border-slate-500/50 shadow-inner'
                : 'text-slate-300 border-transparent hover:text-white hover:bg-slate-800/60 hover:border-slate-700/50'
            ]"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Botón para alternar menú móvil -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/50 focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            <!-- SVG Icono Hambuerguesa / Cerrar -->
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Desplegable Navegación Móvil -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
      <!-- Enlaces para dispositivos móviles -->
      <router-link
        v-for="item in navItems"
        :key="`mobile-${item.name}`"
        :to="item.path"
        @click="isMobileMenuOpen = false"
        :class="[
          'block px-3 py-2 rounded-md text-base font-medium border',
          isActive(item.path)
            ? 'bg-slate-800 text-cyan-400 border-slate-600'
            : 'text-slate-300 border-transparent hover:bg-slate-800/50'
        ]"
      >
        {{ item.label }}
      </router-link>
    </div>
  </header>
</template>

<script lang="ts" src="./Header.ts"></script>
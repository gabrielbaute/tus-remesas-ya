<!-- Componente Encabezado de Navegación Principal estilizado con tokens semánticos -->
<template>
  <!-- Barra superior fija con fondo de tarjeta elevado y acento inferior primario -->
  <header class="sticky top-0 z-50 bg-bg-card border-b-2 border-primary shadow-lg shadow-black/50 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Marca y Logotipo con los colores institucionales -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-3 group">
            <!-- Icono decorativo con borde e interior en contraste primario y fondo principal -->
            <div class="w-10 h-10 rounded-xl bg-primary p-[1px] shadow-md group-hover:shadow-primary/30 transition-all">
              <div class="w-full h-full bg-bg-main rounded-[11px] flex items-center justify-center">
                <span class="text-primary font-black text-xl">⇄</span>
              </div>
            </div>
            <!-- Nombre de la plataforma -->
            <span class="text-lg font-bold tracking-wider text-text-main">
              TUS REMESAS <span class="text-primary font-extrabold">YA</span>
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
              'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border',
              isActive(item.path)
                ? 'bg-bg-elevated text-primary border-primary/80 shadow-sm'
                : 'text-text-muted border-transparent hover:text-text-main hover:bg-bg-elevated/80 hover:border-border-main'
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
            class="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-bg-elevated border border-border-main focus:outline-none"
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
    <div v-if="isMobileMenuOpen" class="md:hidden bg-bg-card border-b border-border-main px-4 pt-2 pb-4 space-y-2">
      <!-- Enlaces para dispositivos móviles -->
      <router-link
        v-for="item in navItems"
        :key="`mobile-${item.name}`"
        :to="item.path"
        @click="isMobileMenuOpen = false"
        :class="[
          'block px-3 py-2 rounded-md text-base font-medium border',
          isActive(item.path)
            ? 'bg-bg-elevated text-primary border-primary/80'
            : 'text-text-muted border-transparent hover:bg-bg-elevated/60'
        ]"
      >
        {{ item.label }}
      </router-link>
    </div>
  </header>
</template>

<script lang="ts" src="./Header.ts"></script>
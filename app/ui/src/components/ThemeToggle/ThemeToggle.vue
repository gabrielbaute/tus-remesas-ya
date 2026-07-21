<!-- Componente: Botón Flotante para Alternar Tema -->
<template>
  <!-- Contenedor flotante fijado en la esquina inferior derecha -->
  <div class="fixed bottom-6 right-6 z-50">
    <button
      @click="handleToggle"
      type="button"
      class="p-3.5 rounded-full bg-bg-card border border-border-main text-text-main shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
      :title="currentTheme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro'"
    >
      <!-- Ícono de Sol (Visible en modo oscuro para volver a claro) -->
      <svg
        v-if="currentTheme === 'dark'"
        class="w-6 h-6 text-primary fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
      </svg>

      <!-- Ícono de Luna (Visible en modo claro para volver a oscuro) -->
      <svg
        v-else
        class="w-6 h-6 text-text-main fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12.3 2c.43 0 .77.35.72.78-.37 3.32.4 6.7 2.37 9.38 1.97 2.68 4.97 4.3 8.24 4.58.43.04.72.43.6.85-.88 3.12-3.03 5.72-5.96 7.15-2.93 1.43-6.38 1.43-9.31 0-2.93-1.43-5.08-4.03-5.96-7.15C2.12 14.87 2.6 11.8 4.35 9.33c1.75-2.47 4.38-4.14 7.37-4.63.19-.03.39-.08.58-.7z"/>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" src="./ThemeToggle.ts"></script>
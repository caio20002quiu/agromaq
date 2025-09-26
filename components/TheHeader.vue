<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-green-600">AgroMaq</h1>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-green-600 font-medium transition-colors">
            Início
          </NuxtLink>
          <NuxtLink to="/maquinas" class="text-gray-700 hover:text-green-600 font-medium transition-colors">
            Máquinas
          </NuxtLink>
          <NuxtLink to="/anunciar" class="btn-primary">
            Anunciar
          </NuxtLink>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-700 hover:text-green-600 font-medium transition-colors">
            Entrar
          </button>
          <button class="btn-secondary">
            Cadastrar
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden mt-4 pt-4 border-t">
        <nav class="flex flex-col space-y-2">
          <NuxtLink to="/" class="text-gray-700 hover:text-green-600 font-medium py-2">
            Início
          </NuxtLink>
          <NuxtLink to="/maquinas" class="text-gray-700 hover:text-green-600 font-medium py-2">
            Máquinas
          </NuxtLink>
          <NuxtLink to="/anunciar" class="btn-primary w-full text-center py-2">
            Anunciar
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

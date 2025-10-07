<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-green-600">AgroMaq</h1>
        </NuxtLink>
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Início</NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/dashboard" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Meus Anúncios</NuxtLink>
        </nav>
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Entrar</NuxtLink>
            <NuxtLink to="/register" class="btn-secondary">Cadastrar</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/dashboard/novo-anuncio" class="btn-primary">Criar Anúncio</NuxtLink>
            <div class="relative">
              <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-green-600 font-bold text-sm">{{ userInitials }}</span>
                </div>
                <span class="font-medium">{{ userName }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                <div class="px-4 py-2 border-b">
                  <p class="text-sm font-semibold text-gray-900">{{ userName }}</p>
                  <p class="text-xs text-gray-500">Área do Anunciante</p>
                </div>
                <NuxtLink to="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                  Meus Anúncios
                </NuxtLink>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Sair
                </button>
              </div>
            </div>
          </template>
        </div>
        <button class="md:hidden p-2" @click="showMobileMenu = !showMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <div v-if="showMobileMenu" class="md:hidden mt-4 pt-4 border-t">
        <nav class="flex flex-col space-y-2">
          <NuxtLink to="/" class="text-gray-700 hover:text-green-600 font-medium py-2">Início</NuxtLink>
          <template v-if="isAuthenticated">
            <NuxtLink to="/dashboard" class="text-gray-700 hover:text-green-600 font-medium py-2">Meus Anúncios</NuxtLink>
            <button @click="logout" class="text-left text-red-600 hover:text-red-700 font-medium py-2">Sair</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-gray-700 hover:text-green-600 font-medium py-2">Entrar</NuxtLink>
            <NuxtLink to="/register" class="btn-primary w-full text-center py-2">Cadastrar</NuxtLink>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const showMobileMenu = ref(false)
const showUserMenu = ref(false)
const isAuthenticated = ref(false)
const userName = ref('')
const userEmail = ref('')

let authCheckInterval: NodeJS.Timeout | null = null

const userInitials = computed(() => {
  if (!userName.value) return 'U'
  const names = userName.value.split(' ').filter(n => n.length > 0)
  if (names.length > 1 && names[0] && names[names.length - 1]) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0]?.[0]?.toUpperCase() || 'U'
})

function checkAuth() {
  if (process.client) {
    const auth = localStorage.getItem('auth')
    if (auth) {
      try {
        const authData = JSON.parse(auth)
        isAuthenticated.value = !!authData.token
        userName.value = authData.user?.nome || 'Usuário'
        userEmail.value = authData.user?.email || ''
      } catch (e) {
        isAuthenticated.value = false
        userName.value = ''
        userEmail.value = ''
      }
    } else {
      isAuthenticated.value = false
      userName.value = ''
      userEmail.value = ''
    }
  }
}

function logout() {
  if (process.client) {
    localStorage.removeItem('auth')
    isAuthenticated.value = false
    userName.value = ''
    userEmail.value = ''
    showUserMenu.value = false
    window.location.href = '/'
  }
}

onMounted(() => {
  checkAuth()
  
  // Verificar autenticação a cada 500ms para detectar mudanças
  if (process.client) {
    authCheckInterval = setInterval(checkAuth, 500)
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.relative')) {
        showUserMenu.value = false
      }
    })
  }
})

onBeforeUnmount(() => {
  if (authCheckInterval) {
    clearInterval(authCheckInterval)
  }
})
</script>

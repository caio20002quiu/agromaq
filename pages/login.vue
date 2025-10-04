<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <!-- Marca -->
        <div class="flex justify-center">
          <div class="flex items-center space-x-2">
            <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-green-600">AgroMaq</h1>
          </div>
        </div>

        <!-- Título e link alternativo -->
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <NuxtLink to="/cadastro" class="font-medium text-green-600 hover:text-green-500 transition-colors">
            crie uma conta gratuita
          </NuxtLink>
        </p>
      </div>

      <!-- Formulário de login -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- Campo de email -->
          <div>
            <label for="email" class="sr-only">Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="form.email"
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Endereço de email"
            >
          </div>

          <!-- Campo de senha -->
          <div>
            <label for="password" class="sr-only">Senha</label>
            <input 
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="form.password"
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
            >
          </div>
        </div>

        <!-- Opções extras -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="form.rememberMe"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Lembrar de mim
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-green-600 hover:text-green-500 transition-colors">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <!-- Botão de envio -->
        <div>
          <button 
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg v-if="!isLoading" class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define título e descrição da página
useHead({
  title: 'Login - AgroMaq',
  meta: [
    {
      name: 'description',
      content: 'Acesse sua conta AgroMaq para negociar máquinas agrícolas com segurança e praticidade.'
    }
  ]
})

// Estado do formulário
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Estado de carregamento
const isLoading = ref(false)

// Função de login (simulação)
const handleLogin = async () => {
  isLoading.value = true

  try {
    // Apenas para debug
    console.log('Login iniciado com:', form)

    // Simula tempo de resposta
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Redireciona para página inicial
    await navigateTo('/')
  } catch (err) {
    console.error('Erro ao tentar login:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

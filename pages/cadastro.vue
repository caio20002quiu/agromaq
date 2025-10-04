<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <!-- Logo -->
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
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta gratuita
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <NuxtLink to="/login" class="font-medium text-green-600 hover:text-green-500 transition-colors">
            faça login na sua conta existente
          </NuxtLink>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nome completo</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              autocomplete="name" 
              required 
              v-model="form.name"
              class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Seu nome completo"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="form.email"
              class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="seu@email.com"
            >
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Telefone</label>
            <input 
              id="phone" 
              name="phone" 
              type="tel" 
              autocomplete="tel" 
              required 
              v-model="form.phone"
              class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="(11) 99999-9999"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="new-password" 
              required 
              v-model="form.password"
              class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Mínimo 8 caracteres"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar senha</label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              autocomplete="new-password" 
              required 
              v-model="form.confirmPassword"
              class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Confirme sua senha"
            >
          </div>
        </div>

        <!-- Password strength indicator -->
        <div v-if="form.password" class="space-y-2">
          <div class="text-sm text-gray-600">Força da senha:</div>
          <div class="flex space-x-1">
            <div 
              v-for="i in 4" 
              :key="i"
              class="h-2 flex-1 rounded-full"
              :class="getPasswordStrengthColor(i)"
            ></div>
          </div>
          <div class="text-xs text-gray-500">
            {{ getPasswordStrengthText() }}
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="isLoading || !isFormValid"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg v-if="!isLoading" class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
              </svg>
              <svg v-else class="animate-spin h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? 'Criando conta...' : 'Criar conta gratuita' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Cadastro - AgroMaq',
  meta: [
    { name: 'description', content: 'Crie sua conta gratuita na AgroMaq e comece a comprar e vender máquinas agrícolas.' }
  ]
} )

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)

const isFormValid = computed(() => {
  return form.name && 
         form.email && 
         form.phone && 
         form.password && 
         form.confirmPassword && 
         form.password === form.confirmPassword && 
         form.password.length >= 8
})

const getPasswordStrength = () => {
  const password = form.password
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z\d]/.test(password)) strength++
  return strength
}

const getPasswordStrengthColor = (index: number) => {
  const strength = getPasswordStrength()
  if (index <= strength) {
    switch (strength) {
      case 1: return 'bg-red-400'
      case 2: return 'bg-yellow-400'
      case 3: return 'bg-blue-400'
      case 4: return 'bg-green-400'
      default: return 'bg-gray-200'
    }
  }
  return 'bg-gray-200'
}

const getPasswordStrengthText = () => {
  const strength = getPasswordStrength()
  switch (strength) {
    case 1: return 'Fraca'
    case 2: return 'Regular'
    case 3: return 'Boa'
    case 4: return 'Forte'
    default: return 'Muito fraca'
  }
}

const handleRegister = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  try {
    console.log('Dados do cadastro:', form)
    await new Promise(resolve => setTimeout(resolve, 2000))
    await navigateTo('/login')
  } catch (error) {
    console.error('Erro no cadastro:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

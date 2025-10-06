<template>
  <div class="container mx-auto px-4 py-16 max-w-md">
    <h1 class="text-2xl font-bold mb-6">Entrar</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded" />
      <input v-model="senha" type="password" placeholder="Senha" class="w-full p-3 border rounded" />
      <button class="btn-primary w-full py-3">Entrar</button>
    </form>
    <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-800 rounded">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from '#app'

const email = ref('')
const senha = ref('')
const error = ref('')

const router = useRouter()
const { login } = useAuth()

async function onSubmit() {
  try {
    const res: any = await login({ email: email.value, password: senha.value })
    if (res?.status === 'ok' && res.data?.token) {
      localStorage.setItem('auth', JSON.stringify(res.data))
      await router.push('/')
    } else {
      error.value = res?.message || 'Falha ao autenticar'
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao autenticar'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-16 max-w-md">
    <h1 class="text-2xl font-bold mb-6">Criar conta</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <input v-model="nome" placeholder="Nome Completo" required class="w-full p-3 border rounded" />
      <input v-model="cpf_cnpj" placeholder="CPF ou CNPJ (somente números)" required class="w-full p-3 border rounded" maxlength="14" />
      <input v-model="email" type="email" placeholder="Email" required class="w-full p-3 border rounded" />
      <input v-model="senha" type="password" placeholder="Senha (mínimo 6 caracteres)" required minlength="6" class="w-full p-3 border rounded" />
      <input v-model="telefone" placeholder="Telefone (opcional)" class="w-full p-3 border rounded" />
      <button class="btn-primary w-full py-3">Cadastrar</button>
    </form>
    <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-800 rounded">{{ error }}</div>
    <div v-if="message" class="mt-4 p-3 bg-green-100 text-green-800 rounded">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const nome = ref('')
const cpf_cnpj = ref('')
const email = ref('')
const senha = ref('')
const telefone = ref('')
const message = ref('')
const error = ref('')

const { register } = useAuth()

async function onSubmit() {
  error.value = ''
  message.value = ''
  
  try {
    const res: any = await register({ 
      nome: nome.value, 
      cpf_cnpj: cpf_cnpj.value.replace(/\D/g, ''),
      email: email.value, 
      password: senha.value, 
      telefone: telefone.value 
    })
    
    if (res?.status === 'ok' && res.data?.token) {
      localStorage.setItem('auth', JSON.stringify(res.data))
      message.value = 'Cadastro realizado com sucesso!'
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } else {
      error.value = res?.message || 'Erro ao cadastrar'
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao cadastrar'
  }
}
</script>

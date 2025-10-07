<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6 text-sm text-gray-600">
        <NuxtLink to="/" class="hover:text-green-600">Início</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/dashboard" class="hover:text-green-600">Dashboard</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">Novo Anúncio</span>
      </nav>

      <!-- Header da Página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Criar Novo Anúncio</h1>
        <p class="text-gray-600">Preencha os dados da máquina que deseja anunciar</p>
      </div>

      <!-- Mensagens de Erro/Sucesso -->
      <div v-if="errorMessage" class="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </div>

      <div v-if="successMessage" class="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="submitForm" class="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Título -->
          <div class="md:col-span-2">
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-2">
              Título do Anúncio <span class="text-red-500">*</span>
            </label>
            <input
              id="titulo"
              v-model="form.titulo"
              type="text"
              required
              maxlength="200"
              placeholder="Ex: Trator John Deere 6110D - 2020"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p class="mt-1 text-xs text-gray-500">{{ form.titulo.length }}/200 caracteres</p>
          </div>

          <!-- Categoria -->
          <div>
            <label for="categoria" class="block text-sm font-medium text-gray-700 mb-2">
              Categoria <span class="text-red-500">*</span>
            </label>
            <select
              id="categoria"
              v-model="form.id_categoria"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                {{ cat.nome }}
              </option>
            </select>
          </div>

          <!-- Marca -->
          <div>
            <label for="marca" class="block text-sm font-medium text-gray-700 mb-2">
              Marca <span class="text-red-500">*</span>
            </label>
            <select
              id="marca"
              v-model="form.id_marca"
              required
              @change="onMarcaChange"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
                {{ marca.nome }}
              </option>
            </select>
          </div>

          <!-- Modelo -->
          <div>
            <label for="modelo" class="block text-sm font-medium text-gray-700 mb-2">
              Modelo <span class="text-red-500">*</span>
            </label>
            <select
              id="modelo"
              v-model="form.id_modelo"
              required
              :disabled="!form.id_marca"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">{{ form.id_marca ? 'Selecione...' : 'Selecione uma marca primeiro' }}</option>
              <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
                {{ modelo.nome }}
              </option>
            </select>
          </div>

          <!-- Preço -->
          <div>
            <label for="preco" class="block text-sm font-medium text-gray-700 mb-2">
              Preço (R$) <span class="text-red-500">*</span>
            </label>
            <input
              id="preco"
              v-model="form.preco"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Ano -->
          <div>
            <label for="ano" class="block text-sm font-medium text-gray-700 mb-2">
              Ano de Fabricação
            </label>
            <input
              id="ano"
              v-model="form.ano"
              type="number"
              min="1900"
              :max="new Date().getFullYear() + 1"
              placeholder="Ex: 2020"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Horas Trabalhadas -->
          <div>
            <label for="horas" class="block text-sm font-medium text-gray-700 mb-2">
              Horas Trabalhadas
            </label>
            <input
              id="horas"
              v-model="form.horas_trabalhadas"
              type="number"
              min="0"
              placeholder="Ex: 1500"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Cor -->
          <div>
            <label for="cor" class="block text-sm font-medium text-gray-700 mb-2">
              Cor
            </label>
            <input
              id="cor"
              v-model="form.cor"
              type="text"
              maxlength="50"
              placeholder="Ex: Verde"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Estado -->
          <div>
            <label for="estado" class="block text-sm font-medium text-gray-700 mb-2">
              Estado <span class="text-red-500">*</span>
            </label>
            <select
              id="estado"
              v-model="form.id_estado"
              required
              @change="onEstadoChange"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option v-for="estado in estados" :key="estado.id" :value="estado.id">
                {{ estado.sigla }} - {{ estado.nome }}
              </option>
            </select>
          </div>

          <!-- Município -->
          <div>
            <label for="municipio" class="block text-sm font-medium text-gray-700 mb-2">
              Município <span class="text-red-500">*</span>
            </label>
            <select
              id="municipio"
              v-model="form.id_municipio"
              required
              :disabled="!form.id_estado"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">{{ form.id_estado ? 'Selecione...' : 'Selecione um estado primeiro' }}</option>
              <option v-for="mun in municipios" :key="mun.id" :value="mun.id">
                {{ mun.nome }}
              </option>
            </select>
          </div>

          <!-- Descrição -->
          <div class="md:col-span-2">
            <label for="descricao" class="block text-sm font-medium text-gray-700 mb-2">
              Descrição Detalhada
            </label>
            <textarea
              id="descricao"
              v-model="form.descricao"
              rows="6"
              placeholder="Descreva características, condições de uso, diferenciais da máquina..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            ></textarea>
            <p class="mt-1 text-xs text-gray-500">Descreva todos os detalhes importantes da máquina</p>
          </div>

          <!-- Upload de Imagens -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Fotos do Anúncio <span class="text-red-500">*</span>
            </label>
            <p class="text-sm text-gray-600 mb-4">
              Adicione até 10 fotos. A primeira será a foto principal.
            </p>
            <ClientOnly>
              <ImageUpload v-model="form.imagens" />
              <template #fallback>
                <div class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div class="animate-pulse text-gray-400">Carregando...</div>
                </div>
              </template>
            </ClientOnly>
          </div>

        </div>

        <!-- Botões -->
        <div class="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Publicando...</span>
            <span v-else>Publicar Anúncio</span>
          </button>
          <NuxtLink
            to="/dashboard"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageUpload from '~/components/forms/ImageUpload.vue'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  titulo: '',
  id_categoria: '',
  id_marca: '',
  id_modelo: '',
  preco: '',
  ano: '',
  horas_trabalhadas: '',
  cor: '',
  id_estado: '',
  id_municipio: '',
  descricao: '',
  imagens: [] as string[]
})

const categorias = ref<Array<{ id: number; nome: string }>>([])
const marcas = ref<Array<{ id: number; nome: string }>>([])
const modelos = ref<Array<{ id: number; nome: string }>>([])
const estados = ref<Array<{ id: number; sigla: string; nome: string }>>([])
const municipios = ref<Array<{ id: number; nome: string }>>([])

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Usar composable do backend
const api = useApi()

// Carregar dados iniciais
onMounted(async () => {
  await Promise.all([
    loadCategorias(),
    loadMarcas(),
    loadEstados()
  ])
})

const loadCategorias = async () => {
  try {
    const data = await api.getCategorias()
    categorias.value = data as Array<{ id: number; nome: string }>
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

const loadMarcas = async () => {
  try {
    const data = await api.getMarcas()
    marcas.value = data as Array<{ id: number; nome: string }>
  } catch (error) {
    console.error('Erro ao carregar marcas:', error)
  }
}

const loadEstados = async () => {
  try {
    const data = await api.getEstados()
    estados.value = data as Array<{ id: number; sigla: string; nome: string }>
  } catch (error) {
    console.error('Erro ao carregar estados:', error)
  }
}

const onMarcaChange = async () => {
  form.value.id_modelo = ''
  modelos.value = []
  
  if (!form.value.id_marca) return
  
  try {
    const data = await api.getModelos(parseInt(form.value.id_marca as any))
    modelos.value = data as Array<{ id: number; nome: string }>
  } catch (error) {
    console.error('Erro ao carregar modelos:', error)
  }
}

const onEstadoChange = async () => {
  form.value.id_municipio = ''
  municipios.value = []
  
  if (!form.value.id_estado) return
  
  // Encontrar a sigla do estado selecionado
  const estadoSelecionado = estados.value.find(e => e.id === parseInt(form.value.id_estado as any))
  if (!estadoSelecionado) return
  
  try {
    const data = await api.getMunicipios(estadoSelecionado.sigla)
    municipios.value = data as Array<{ id: number; nome: string }>
  } catch (error) {
    console.error('Erro ao carregar municípios:', error)
  }
}



const submitForm = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = true

  try {
    // Validar campos obrigatórios
    if (!form.value.titulo || !form.value.id_categoria || !form.value.id_marca || 
        !form.value.id_modelo || !form.value.preco || !form.value.id_estado || !form.value.id_municipio) {
      errorMessage.value = 'Por favor, preencha todos os campos obrigatórios'
      isSubmitting.value = false
      return
    }

    // Verificar autenticação
    const authData = localStorage.getItem('auth')
    if (!authData) {
      errorMessage.value = 'Você precisa estar logado para criar um anúncio'
      navigateTo('/login')
      return
    }

    // Validar se há imagens
    if (form.value.imagens.length === 0) {
      errorMessage.value = 'Por favor, adicione pelo menos uma imagem'
      isSubmitting.value = false
      return
    }

    // Preparar dados
    const payload = {
      titulo: form.value.titulo,
      id_categoria: parseInt(form.value.id_categoria as any),
      id_marca: parseInt(form.value.id_marca as any),
      id_modelo: parseInt(form.value.id_modelo as any),
      preco: parseFloat(form.value.preco as any),
      ano: form.value.ano ? parseInt(form.value.ano as any) : null,
      horas_trabalhadas: form.value.horas_trabalhadas ? parseInt(form.value.horas_trabalhadas as any) : null,
      cor: form.value.cor || null,
      id_estado: parseInt(form.value.id_estado as any),
      id_municipio: parseInt(form.value.id_municipio as any),
      descricao: form.value.descricao || null,
      imagens: form.value.imagens
    }

    // Enviar para API do backend NestJS
    await api.createAnuncio(payload)
    
    successMessage.value = 'Anúncio criado com sucesso! Redirecionando...'
    
    // Redirecionar para dashboard após 2 segundos
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 2000)

  } catch (error: any) {
    console.error('Erro ao criar anúncio:', error)
    errorMessage.value = error.data?.message || error.message || 'Erro ao criar anúncio. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

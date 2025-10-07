<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6 text-sm text-gray-600">
        <NuxtLink to="/" class="hover:text-green-600">Início</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/dashboard" class="hover:text-green-600">Dashboard</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">Editar Anúncio</span>
      </nav>

      <!-- Header da Página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Editar Anúncio</h1>
        <p class="text-gray-600">Atualize os dados da sua máquina</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Carregando anúncio...</p>
      </div>

      <!-- Erro ao carregar -->
      <div v-else-if="loadError" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
        {{ loadError }}
      </div>

      <!-- Formulário -->
      <div v-else>
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
              <FormsImageUpload v-model="form.imagens" />
            </div>

          </div>

          <!-- Botões -->
          <div class="flex justify-between items-center mt-8 pt-6 border-t">
            <NuxtLink
              to="/dashboard"
              class="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </NuxtLink>
            <button
              type="submit"
              :disabled="submitting"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg v-if="submitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ submitting ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const api = useApi()

const loading = ref(true)
const loadError = ref('')
const submitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
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

const categorias = ref<any[]>([])
const marcas = ref<any[]>([])
const modelos = ref<any[]>([])
const estados = ref<any[]>([])
const municipios = ref<any[]>([])

// Carregar dados iniciais e anúncio
onMounted(async () => {
  try {
    // Carregar dropdowns
    const [catData, marcasData, estadosData] = await Promise.all([
      api.getCategorias(),
      api.getMarcas(),
      api.getEstados()
    ])
    
    categorias.value = catData as any
    marcas.value = marcasData as any
    estados.value = estadosData as any

    // Carregar anúncio
    const id = parseInt(route.params.id as string)
    if (isNaN(id)) {
      loadError.value = 'ID inválido'
      return
    }

    const anuncio: any = await api.getAnuncio(id)
    
    // Preencher formulário
    form.titulo = anuncio.titulo || ''
    form.id_categoria = anuncio.id_categoria?.toString() || ''
    form.id_marca = anuncio.id_marca?.toString() || ''
    form.id_modelo = anuncio.id_modelo?.toString() || ''
    form.preco = anuncio.preco?.toString() || ''
    form.ano = anuncio.ano?.toString() || ''
    form.horas_trabalhadas = anuncio.horas_trabalhadas?.toString() || ''
    form.cor = anuncio.cor || ''
    form.id_estado = anuncio.id_estado?.toString() || ''
    form.id_municipio = anuncio.id_municipio?.toString() || ''
    form.descricao = anuncio.descricao || ''
    
    // Carregar imagens
    if (anuncio.imagens && anuncio.imagens.length > 0) {
      form.imagens = anuncio.imagens.map((img: any) => img.url)
    }

    // Carregar modelos se marca estiver selecionada
    if (form.id_marca) {
      modelos.value = await api.getModelos(parseInt(form.id_marca)) as any
    }

    // Carregar municípios se estado estiver selecionado
    if (form.id_estado) {
      const estado = estados.value.find(e => e.id === parseInt(form.id_estado))
      if (estado) {
        municipios.value = await api.getMunicipios(estado.sigla) as any
      }
    }

  } catch (error: any) {
    console.error('Erro ao carregar:', error)
    loadError.value = error.data?.message || 'Erro ao carregar anúncio'
  } finally {
    loading.value = false
  }
})

async function onMarcaChange() {
  form.id_modelo = ''
  modelos.value = []
  
  if (form.id_marca) {
    try {
      modelos.value = await api.getModelos(parseInt(form.id_marca)) as any
    } catch (error) {
      console.error('Erro ao carregar modelos:', error)
    }
  }
}

async function onEstadoChange() {
  form.id_municipio = ''
  municipios.value = []
  
  if (form.id_estado) {
    try {
      const estadoSelecionado = estados.value.find(e => e.id === parseInt(form.id_estado))
      if (estadoSelecionado) {
        municipios.value = await api.getMunicipios(estadoSelecionado.sigla) as any
      }
    } catch (error) {
      console.error('Erro ao carregar municípios:', error)
    }
  }
}

async function submitForm() {
  errorMessage.value = ''
  successMessage.value = ''
  submitting.value = true

  try {
    // Validar se há imagens
    if (form.imagens.length === 0) {
      errorMessage.value = 'Por favor, adicione pelo menos uma imagem'
      submitting.value = false
      return
    }
    
    const data = {
      titulo: form.titulo,
      id_categoria: form.id_categoria,
      id_marca: form.id_marca,
      id_modelo: form.id_modelo,
      preco: form.preco,
      ano: form.ano,
      horas_trabalhadas: form.horas_trabalhadas,
      cor: form.cor,
      id_estado: form.id_estado,
      id_municipio: form.id_municipio,
      descricao: form.descricao,
      imagens: form.imagens
    }

    const id = parseInt(route.params.id as string)
    await api.updateAnuncio(id, data)
    
    successMessage.value = 'Anúncio atualizado com sucesso!'
    
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    
  } catch (error: any) {
    console.error('Erro ao atualizar anúncio:', error)
    errorMessage.value = error.data?.message || 'Erro ao atualizar anúncio. Tente novamente.'
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Editar Anúncio - Dashboard'
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-5 sticky top-4">
    <!-- Título -->
    <div class="mb-5 pb-4 border-b border-gray-200">
      <h3 class="text-lg font-bold text-gray-900">Filtrar Anúncios</h3>
    </div>

    <!-- Busca por Texto -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Buscar por palavra-chave</label>
      <input 
        v-model="filters.busca" 
        type="text" 
        placeholder="Ex: Trator John Deere..." 
        class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        @keypress.enter="apply"
      >
    </div>

    <!-- BUSCA SIMPLES -->
    <div class="space-y-4 mb-5">
      <!-- Categoria -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Categoria:</label>
        <select 
          v-model="filters.id_categoria" 
          @change="onCategoriaChange"
          class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        >
          <option value="">Todas as categorias</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
        </select>
      </div>

      <!-- Marca -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Marca:</label>
        <select 
          v-model="filters.id_marca" 
          @change="onMarcaChange"
          class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        >
          <option value="">Todas as marcas</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
        </select>
      </div>

      <!-- Modelo -->
      <div v-if="filters.id_marca">
        <label class="block text-sm font-medium text-gray-700 mb-2">Modelo:</label>
        <select 
          v-model="filters.id_modelo"
          class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        >
          <option value="">Todos os modelos</option>
          <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">{{ modelo.nome }}</option>
        </select>
      </div>
    </div>

    <!-- Divisor -->
    <div class="my-5 border-t border-gray-200"></div>

    <!-- Título Filtros Avançados -->
    <div class="mb-4">
      <h4 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Filtros Avançados
        <span v-if="hasAdvancedFilters" class="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
          {{ countAdvancedFilters }}
        </span>
      </h4>
    </div>

    <!-- FILTROS AVANÇADOS (sempre visíveis) -->
    <div class="space-y-4 mb-5 pb-5 border-b border-gray-200">
      <!-- Range de Ano -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Ano:</label>
        <div class="grid grid-cols-2 gap-2">
          <input 
            v-model="filters.ano_min" 
            type="number" 
            placeholder="De"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
          <input 
            v-model="filters.ano_max" 
            type="number" 
            placeholder="Até"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
        </div>
      </div>

      <!-- Range de Preço -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Preço (R$):</label>
        <div class="grid grid-cols-2 gap-2">
          <input 
            v-model="filters.preco_min" 
            type="number" 
            placeholder="Mínimo"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
          <input 
            v-model="filters.preco_max" 
            type="number" 
            placeholder="Máximo"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
        </div>
      </div>

      <!-- Range de Horas -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Horas Trabalhadas:</label>
        <div class="grid grid-cols-2 gap-2">
          <input 
            v-model="filters.horas_min" 
            type="number" 
            placeholder="Mínimo"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
          <input 
            v-model="filters.horas_max" 
            type="number" 
            placeholder="Máximo"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
        </div>
      </div>

      <!-- Estado -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Estado:</label>
        <select 
          v-model="filters.id_estado" 
          @change="onEstadoChange"
          class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        >
          <option value="">Todos os estados</option>
          <option v-for="estado in estados" :key="estado.id" :value="estado.id">{{ estado.nome }} ({{ estado.sigla }})</option>
        </select>
      </div>

      <!-- Município -->
      <div v-if="filters.id_estado">
        <label class="block text-sm font-medium text-gray-700 mb-2">Município:</label>
        <select 
          v-model="filters.id_municipio"
          class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        >
          <option value="">Todos os municípios</option>
          <option v-for="mun in municipios" :key="mun.id" :value="mun.id">{{ mun.nome }}</option>
        </select>
      </div>
    </div>

    <!-- Botões de Ação -->
    <div class="space-y-2">
      <button 
        @click="apply" 
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        BUSCAR
      </button>

      <button 
        @click="clearFilters" 
        class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition-colors text-sm"
      >
        Limpar Filtros
      </button>
    </div>

    <!-- Contador de Filtros Ativos -->
    <div v-if="activeFiltersCount > 0" class="mt-4 text-center text-xs text-gray-500">
      {{ activeFiltersCount }} filtro{{ activeFiltersCount > 1 ? 's' : '' }} ativo{{ activeFiltersCount > 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['apply'])
const api = useApi()

const filters = reactive({
  busca: '',
  id_categoria: '',
  id_marca: '',
  id_modelo: '',
  ano_min: '',
  ano_max: '',
  preco_min: '',
  preco_max: '',
  horas_min: '',
  horas_max: '',
  id_estado: '',
  id_municipio: '',
})

const categorias = ref<any[]>([])
const marcas = ref<any[]>([])
const modelos = ref<any[]>([])
const estados = ref<any[]>([])
const municipios = ref<any[]>([])

// Computed para contar filtros ativos
const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.busca) count++
  if (filters.id_categoria) count++
  if (filters.id_marca) count++
  if (filters.id_modelo) count++
  if (filters.ano_min || filters.ano_max) count++
  if (filters.preco_min || filters.preco_max) count++
  if (filters.horas_min || filters.horas_max) count++
  if (filters.id_estado) count++
  if (filters.id_municipio) count++
  return count
})

// Computed para verificar se há filtros avançados ativos
const hasAdvancedFilters = computed(() => {
  return !!(
    filters.ano_min || 
    filters.ano_max || 
    filters.preco_min || 
    filters.preco_max || 
    filters.horas_min || 
    filters.horas_max || 
    filters.id_estado || 
    filters.id_municipio
  )
})

// Computed para contar filtros avançados
const countAdvancedFilters = computed(() => {
  let count = 0
  if (filters.ano_min || filters.ano_max) count++
  if (filters.preco_min || filters.preco_max) count++
  if (filters.horas_min || filters.horas_max) count++
  if (filters.id_estado) count++
  if (filters.id_municipio) count++
  return count
})

// Carregar dados iniciais
onMounted(async () => {
  try {
    categorias.value = await api.getCategorias()
    marcas.value = await api.getMarcas()
    estados.value = await api.getEstados()
  } catch (error) {
    console.error('Erro ao carregar dados dos filtros:', error)
  }
})

// Quando seleciona categoria, limpa marca e modelo
async function onCategoriaChange() {
  filters.id_marca = ''
  filters.id_modelo = ''
  modelos.value = []
}

// Quando seleciona marca, carrega modelos
async function onMarcaChange() {
  filters.id_modelo = ''
  modelos.value = []
  
  if (filters.id_marca) {
    try {
      modelos.value = await api.getModelos(parseInt(filters.id_marca))
    } catch (error) {
      console.error('Erro ao carregar modelos:', error)
    }
  }
}

// Quando seleciona estado, carrega municípios
async function onEstadoChange() {
  filters.id_municipio = ''
  municipios.value = []
  
  if (filters.id_estado) {
    try {
      const estadoSelecionado = estados.value.find(e => e.id === parseInt(filters.id_estado))
      if (estadoSelecionado) {
        municipios.value = await api.getMunicipios(estadoSelecionado.sigla)
      }
    } catch (error) {
      console.error('Erro ao carregar municípios:', error)
    }
  }
}

function apply() {
  // Remover campos vazios antes de emitir
  const activeFilters: any = {}
  Object.keys(filters).forEach(key => {
    const value = (filters as any)[key]
    if (value !== '' && value !== null && value !== undefined) {
      activeFilters[key] = value
    }
  })
  
  emit('apply', activeFilters)
}

function clearFilters() {
  filters.busca = ''
  filters.id_categoria = ''
  filters.id_marca = ''
  filters.id_modelo = ''
  filters.ano_min = ''
  filters.ano_max = ''
  filters.preco_min = ''
  filters.preco_max = ''
  filters.horas_min = ''
  filters.horas_max = ''
  filters.id_estado = ''
  filters.id_municipio = ''
  modelos.value = []
  municipios.value = []
  
  emit('apply', {})
}
</script>

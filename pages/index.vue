<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6 md:py-8 max-w-[1600px]">
      <!-- Header -->
      <div class="mb-6 md:mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Máquinas Agrícolas</h1>
        <p class="text-sm md:text-base text-gray-600">
          {{ totalResults }} anúncio{{ totalResults !== 1 ? 's' : '' }} 
          {{ Object.keys(currentFilters).length > 0 ? 'encontrado' + (totalResults !== 1 ? 's' : '') : 'disponíve' + (totalResults !== 1 ? 'is' : 'l') }}
        </p>
      </div>

      <ClientOnly>
        <!-- Loading -->
        <div v-if="pending" class="flex justify-center items-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>

        <!-- Erro -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-800 px-4 md:px-6 py-3 md:py-4 rounded-lg">
          <p class="text-sm md:text-base">Erro ao carregar anúncios. Por favor, tente novamente.</p>
        </div>

        <!-- Conteúdo Principal -->
        <div v-else class="flex flex-col lg:flex-row gap-6">
          <!-- Sidebar de Filtros -->
          <aside class="w-full lg:w-80 flex-shrink-0">
            <FiltersSidebar @apply="onFilters" />
          </aside>

          <!-- Grid de Anúncios -->
          <main class="flex-1 min-w-0">
            <!-- Filtros Ativos -->
            <div v-if="activeFiltersDisplay.length > 0" class="mb-6 bg-white rounded-lg shadow-sm p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtros Ativos ({{ activeFiltersDisplay.length }})
                </h3>
                <button 
                  @click="clearAllFilters"
                  class="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpar Todos
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <div 
                  v-for="filter in activeFiltersDisplay" 
                  :key="filter.key"
                  class="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-sm"
                >
                  <span class="font-medium">{{ filter.label }}:</span>
                  <span>{{ filter.value }}</span>
                  <button 
                    @click="removeFilter(filter.key)"
                    class="hover:bg-green-100 rounded-full p-0.5 transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sem Anúncios -->
            <div v-if="machines.length === 0" class="text-center py-12 md:py-16 bg-white rounded-lg shadow-sm">
              <svg class="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <h3 class="text-lg md:text-xl font-semibold text-gray-700 mb-2">Nenhum anúncio encontrado</h3>
              <p class="text-sm md:text-base text-gray-500 mb-4 md:mb-6">Seja o primeiro a anunciar uma máquina!</p>
              <NuxtLink to="/dashboard/novo-anuncio" class="inline-block bg-green-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-green-700 transition-colors">
                Criar Anúncio
              </NuxtLink>
            </div>

            <!-- Grid de Cards -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <MachineCard v-for="machine in machines" :key="machine.id" :machine="machine" />
            </div>
          </main>
        </div>

        <template #fallback>
          <div class="flex justify-center items-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import FiltersSidebar from '../components/filters/FiltersSidebar.vue'
import MachineCard from '../components/machine/MachineCard.vue'

const api = useApi()
const machines = ref<any[]>([])
const pending = ref(true)
const error = ref<Error | null>(null)
const totalResults = ref(0)
const currentFilters = ref<Record<string, any>>({})

// Dados para labels dos filtros
const categorias = ref<any[]>([])
const marcas = ref<any[]>([])
const modelos = ref<any[]>([])
const estados = ref<any[]>([])
const municipios = ref<any[]>([])

// Computed para exibir filtros ativos com labels
const activeFiltersDisplay = computed(() => {
  const filters: Array<{ key: string; label: string; value: string }> = []
  
  if (currentFilters.value.busca) {
    filters.push({
      key: 'busca',
      label: 'Busca',
      value: currentFilters.value.busca
    })
  }
  
  if (currentFilters.value.id_categoria) {
    const cat = categorias.value.find(c => c.id === parseInt(currentFilters.value.id_categoria))
    filters.push({
      key: 'id_categoria',
      label: 'Categoria',
      value: cat?.nome || 'N/A'
    })
  }
  
  if (currentFilters.value.id_marca) {
    const marca = marcas.value.find(m => m.id === parseInt(currentFilters.value.id_marca))
    filters.push({
      key: 'id_marca',
      label: 'Marca',
      value: marca?.nome || 'N/A'
    })
  }
  
  if (currentFilters.value.id_modelo) {
    const modelo = modelos.value.find(m => m.id === parseInt(currentFilters.value.id_modelo))
    filters.push({
      key: 'id_modelo',
      label: 'Modelo',
      value: modelo?.nome || 'N/A'
    })
  }
  
  if (currentFilters.value.ano_min || currentFilters.value.ano_max) {
    const min = currentFilters.value.ano_min || '...'
    const max = currentFilters.value.ano_max || '...'
    filters.push({
      key: 'ano',
      label: 'Ano',
      value: `${min} até ${max}`
    })
  }
  
  if (currentFilters.value.preco_min || currentFilters.value.preco_max) {
    const min = currentFilters.value.preco_min ? `R$ ${parseFloat(currentFilters.value.preco_min).toLocaleString('pt-BR')}` : '...'
    const max = currentFilters.value.preco_max ? `R$ ${parseFloat(currentFilters.value.preco_max).toLocaleString('pt-BR')}` : '...'
    filters.push({
      key: 'preco',
      label: 'Preço',
      value: `${min} até ${max}`
    })
  }
  
  if (currentFilters.value.horas_min || currentFilters.value.horas_max) {
    const min = currentFilters.value.horas_min || '...'
    const max = currentFilters.value.horas_max || '...'
    filters.push({
      key: 'horas',
      label: 'Horas',
      value: `${min}h até ${max}h`
    })
  }
  
  if (currentFilters.value.id_estado) {
    const estado = estados.value.find(e => e.id === parseInt(currentFilters.value.id_estado))
    filters.push({
      key: 'id_estado',
      label: 'Estado',
      value: estado?.nome || 'N/A'
    })
  }
  
  if (currentFilters.value.id_municipio) {
    const mun = municipios.value.find(m => m.id === parseInt(currentFilters.value.id_municipio))
    filters.push({
      key: 'id_municipio',
      label: 'Município',
      value: mun?.nome || 'N/A'
    })
  }
  
  return filters
})

async function loadData(filters: Record<string, any> = {}) {
  pending.value = true
  error.value = null
  currentFilters.value = filters
  
  try {
    console.log('🔍 Buscando com filtros:', filters)
    const response = await api.getAnuncios(filters)
    
    // Backend agora retorna { data, total, limit, offset }
    if (response.data) {
      machines.value = response.data
      totalResults.value = response.total
    } else {
      // Fallback para formato antigo
      machines.value = response as any || []
      totalResults.value = machines.value.length
    }
    
    console.log('✅ Anúncios carregados:', machines.value.length, 'de', totalResults.value)
    console.log('📸 Primeiro anúncio com imagens:', machines.value[0]?.imagens)
    console.log('📸 Todos os anúncios:', machines.value.map(m => ({ id: m.id, titulo: m.titulo, imagens: m.imagens?.length || 0 })))
  } catch (err: any) {
    error.value = err
    console.error('❌ Erro ao carregar anúncios:', err)
  } finally {
    pending.value = false
  }
}

function onFilters(filters: Record<string, any>) {
  console.log('🎯 Filtros aplicados:', filters)
  
  // Armazenar dados para labels
  if (filters.id_modelo && modelos.value.length === 0) {
    // Carregar modelos se necessário para exibir label
    const marcaId = parseInt(filters.id_marca)
    if (marcaId) {
      api.getModelos(marcaId).then((data: any) => {
        modelos.value = data
      })
    }
  }
  
  if (filters.id_municipio && municipios.value.length === 0) {
    // Carregar municípios se necessário para exibir label
    const estadoId = parseInt(filters.id_estado)
    if (estadoId) {
      const estado = estados.value.find(e => e.id === estadoId)
      if (estado) {
        api.getMunicipios(estado.sigla).then((data: any) => {
          municipios.value = data
        })
      }
    }
  }
  
  loadData(filters)
}

function removeFilter(key: string) {
  const newFilters = { ...currentFilters.value }
  
  // Remover filtros relacionados
  if (key === 'ano') {
    delete newFilters.ano_min
    delete newFilters.ano_max
  } else if (key === 'preco') {
    delete newFilters.preco_min
    delete newFilters.preco_max
  } else if (key === 'horas') {
    delete newFilters.horas_min
    delete newFilters.horas_max
  } else if (key === 'id_marca') {
    delete newFilters.id_marca
    delete newFilters.id_modelo // Limpa modelo também
    modelos.value = []
  } else if (key === 'id_estado') {
    delete newFilters.id_estado
    delete newFilters.id_municipio // Limpa município também
    municipios.value = []
  } else {
    delete newFilters[key]
  }
  
  loadData(newFilters)
}

function clearAllFilters() {
  modelos.value = []
  municipios.value = []
  loadData({})
}

// Carregar dados apenas no cliente
onMounted(async () => {
  console.log('🚀 Homepage montada - Carregando anúncios...')
  
  // Carregar dados para labels dos filtros
  try {
    categorias.value = await api.getCategorias() as any
    marcas.value = await api.getMarcas() as any
    estados.value = await api.getEstados() as any
  } catch (error) {
    console.error('Erro ao carregar dados dos filtros:', error)
  }
  
  loadData()
})
</script>

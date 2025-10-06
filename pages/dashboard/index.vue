<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Meus Anúncios</h1>
          <p class="text-gray-600 mt-1">Gerencie seus anúncios e acompanhe o desempenho</p>
        </div>
        <NuxtLink 
          to="/dashboard/novo-anuncio" 
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Anúncio
        </NuxtLink>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Total de Anúncios</span>
            <div class="bg-blue-100 p-2 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ stats.totalAnuncios }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ stats.anunciosAtivos }} ativos</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Visualizações</span>
            <div class="bg-green-100 p-2 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ formatNumber(stats.visualizacoes) }}</p>
          <p class="text-xs text-green-600 mt-1">↑ +12% este mês</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Favoritos</span>
            <div class="bg-red-100 p-2 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ stats.favoritos }}</p>
          <p class="text-xs text-gray-500 mt-1">Em todos os anúncios</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Taxa de Conversão</span>
            <div class="bg-purple-100 p-2 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">3.2%</p>
          <p class="text-xs text-green-600 mt-1">↑ +0.5% este mês</p>
        </div>
      </div>

      <!-- Filtros e Tabs -->
      <div class="bg-white rounded-lg shadow-md mb-6">
        <div class="flex border-b">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              'px-6 py-4 font-medium transition-colors',
              activeTab === tab.value 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ tab.label }} ({{ getTabCount(tab.value) }})
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="text-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Carregando anúncios...</p>
      </div>

      <!-- Lista de Anúncios -->
      <div v-else-if="anunciosFiltrados.length > 0" class="space-y-4">
        <div 
          v-for="anuncio in anunciosFiltrados" 
          :key="anuncio.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
        >
          <div class="flex flex-col md:flex-row">
            <!-- Imagem -->
            <div class="md:w-48 h-48 bg-gray-200 flex-shrink-0">
              <img 
                v-if="getImagemPrincipal(anuncio)" 
                :src="getImagemPrincipal(anuncio)" 
                :alt="anuncio.titulo" 
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>

            <!-- Informações -->
            <div class="flex-1 p-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{{ anuncio.titulo }}</h3>
                  <div class="flex items-center text-sm text-gray-600 space-x-4">
                    <span v-if="anuncio.marca">{{ anuncio.marca.nome }}</span>
                    <span v-if="anuncio.modelo">{{ anuncio.modelo.nome }}</span>
                    <span v-if="anuncio.ano">{{ anuncio.ano }}</span>
                  </div>
                </div>
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    anuncio.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  ]"
                >
                  {{ anuncio.ativo ? 'Ativo' : 'Inativo' }}
                </span>
              </div>

              <p v-if="anuncio.descricao" class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ anuncio.descricao }}
              </p>

              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-green-600">R$ {{ formatPrice(anuncio.preco) }}</span>
                  <p class="text-xs text-gray-500">Publicado em {{ formatDate(anuncio.criado_em) }}</p>
                </div>

                <div class="flex gap-2">
                  <NuxtLink 
                    :to="`/anuncios/${anuncio.id}`"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Visualizar
                  </NuxtLink>
                  <NuxtLink 
                    :to="`/dashboard/editar/${anuncio.id}`"
                    class="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Editar
                  </NuxtLink>
                  <button 
                    @click="toggleAtivo(anuncio)"
                    class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {{ anuncio.ativo ? 'Desativar' : 'Ativar' }}
                  </button>
                  <button 
                    @click="deletarAnuncio(anuncio)"
                    class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-md p-16 text-center">
        <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Nenhum anúncio encontrado</h3>
        <p class="text-gray-600 mb-6">Comece criando seu primeiro anúncio</p>
        <NuxtLink 
          to="/dashboard/novo-anuncio"
          class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Criar Anúncio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Machine, DashboardStats } from '~/types/machine'

definePageMeta({
  middleware: 'auth'
})

const activeTab = ref<'todos' | 'ativos' | 'inativos'>('todos')
const pending = ref(true)
const anuncios = ref<Machine[]>([])

const tabs = [
  { label: 'Todos', value: 'todos' as const },
  { label: 'Ativos', value: 'ativos' as const },
  { label: 'Inativos', value: 'inativos' as const }
]

const stats = ref<DashboardStats>({
  totalAnuncios: 0,
  anunciosAtivos: 0,
  visualizacoes: 0,
  favoritos: 0
})

const api = useApi()

// Carregar anúncios do usuário
async function loadAnuncios() {
  try {
    pending.value = true
    const response: any = await api.getMeusAnuncios()
    anuncios.value = response.anuncios || []
    stats.value = response.stats || stats.value
  } catch (err) {
    console.error('Error loading anuncios:', err)
  } finally {
    pending.value = false
  }
}

loadAnuncios()

const anunciosFiltrados = computed(() => {
  if (activeTab.value === 'ativos') {
    return anuncios.value.filter(a => a.ativo)
  }
  if (activeTab.value === 'inativos') {
    return anuncios.value.filter(a => !a.ativo)
  }
  return anuncios.value
})

function getTabCount(tab: string) {
  if (tab === 'todos') return anuncios.value.length
  if (tab === 'ativos') return anuncios.value.filter(a => a.ativo).length
  if (tab === 'inativos') return anuncios.value.filter(a => !a.ativo).length
  return 0
}

function getImagemPrincipal(anuncio: Machine): string | undefined {
  if (!anuncio.imagens || anuncio.imagens.length === 0) return undefined
  const principal = anuncio.imagens.find((img: any) => img.principal)
  return principal?.url || anuncio.imagens[0]?.url || undefined
}

function formatPrice(value?: number) {
  if (!value) return '0,00'
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function formatNumber(value: number) {
  return value.toLocaleString('pt-BR')
}

function formatDate(dateString?: string) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

function getAuthToken() {
  const auth = localStorage.getItem('auth')
  if (auth) {
    return JSON.parse(auth).token
  }
  return null
}

async function toggleAtivo(anuncio: Machine) {
  try {
    await api.toggleAnuncio(typeof anuncio.id === 'number' ? anuncio.id : parseInt(anuncio.id as string))
    anuncio.ativo = !anuncio.ativo
    stats.value.anunciosAtivos += anuncio.ativo ? 1 : -1
  } catch (err) {
    console.error('Error toggling anuncio:', err)
    alert('Erro ao atualizar anúncio')
  }
}

async function deletarAnuncio(anuncio: Machine) {
  // Confirmação
  if (!confirm(`Tem certeza que deseja deletar o anúncio "${anuncio.titulo}"?\n\nEsta ação não pode ser desfeita e todas as imagens serão removidas.`)) {
    return
  }

  try {
    const id = typeof anuncio.id === 'number' ? anuncio.id : parseInt(anuncio.id as string)
    await api.deleteAnuncio(id)
    
    // Remover da lista
    const index = anuncios.value.findIndex(a => a.id === anuncio.id)
    if (index !== -1) {
      anuncios.value.splice(index, 1)
      stats.value.totalAnuncios--
      if (anuncio.ativo) {
        stats.value.anunciosAtivos--
      }
    }
    
    alert('Anúncio deletado com sucesso!')
  } catch (err) {
    console.error('Error deleting anuncio:', err)
    alert('Erro ao deletar anúncio. Tente novamente.')
  }
}

useHead({
  title: 'Dashboard - Meus Anúncios'
})
</script>

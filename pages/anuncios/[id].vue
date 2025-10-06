<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="container mx-auto px-4 py-8">
      <div class="animate-pulse">
        <div class="bg-gray-300 h-96 rounded-lg mb-6"></div>
        <div class="bg-gray-300 h-8 w-3/4 rounded mb-4"></div>
        <div class="bg-gray-300 h-6 w-1/2 rounded"></div>
      </div>
    </div>

    <div v-else-if="error" class="container mx-auto px-4 py-8">
      <div class="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
        <h2 class="text-xl font-bold mb-2">Erro ao carregar anúncio</h2>
        <p>{{ error }}</p>
        <NuxtLink to="/" class="mt-4 inline-block text-red-600 hover:text-red-800 font-medium">
          ← Voltar para a página inicial
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="anuncio" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6 text-sm text-gray-600">
        <NuxtLink to="/" class="hover:text-green-600">Início</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/" class="hover:text-green-600">Anúncios</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ anuncio.titulo }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Coluna Principal (Imagens e Descrição) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Galeria de Imagens -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Imagem Principal -->
            <div 
              class="relative h-96 bg-gray-200 cursor-pointer group"
              @click="openLightbox(currentImageIndex)"
            >
              <img 
                v-if="imagemAtual" 
                :src="imagemAtual" 
                :alt="anuncio.titulo" 
                class="w-full h-full object-contain"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <svg class="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              
              <!-- Overlay de Zoom -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                  <svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                  </svg>
                </div>
              </div>

              <!-- Indicador de múltiplas imagens -->
              <div v-if="imagens.length > 1" class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ currentImageIndex + 1 }} / {{ imagens.length }}
              </div>

              <!-- Botões de Navegação -->
              <button
                v-if="imagens.length > 1 && currentImageIndex > 0"
                @click.stop="prevImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                v-if="imagens.length > 1 && currentImageIndex < imagens.length - 1"
                @click.stop="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Miniaturas -->
            <div v-if="imagens.length > 1" class="p-4 flex gap-2 overflow-x-auto">
              <button
                v-for="(img, index) in imagens"
                :key="index"
                @click="selectImage(index)"
                :class="[
                  'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105',
                  currentImageIndex === index ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-400'
                ]"
              >
                <img :src="img" :alt="`Imagem ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Informações Principais -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ anuncio.titulo }}</h1>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span v-if="anuncio.categoria" class="inline-flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    {{ anuncio.categoria.nome }}
                  </span>
                  <span v-if="localizacao" class="inline-flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ localizacao }}
                  </span>
                  <span class="text-gray-400">•</span>
                  <span>{{ dataPublicacao }}</span>
                </div>
              </div>
            </div>

            <!-- Especificações -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div v-if="anuncio.marca" class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-1">🏭</div>
                <div class="text-xs text-gray-500 mb-1">Marca</div>
                <div class="font-semibold text-gray-900">{{ anuncio.marca.nome }}</div>
              </div>
              <div v-if="anuncio.modelo" class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-1">📋</div>
                <div class="text-xs text-gray-500 mb-1">Modelo</div>
                <div class="font-semibold text-gray-900">{{ anuncio.modelo.nome }}</div>
              </div>
              <div v-if="anuncio.ano" class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-1">📅</div>
                <div class="text-xs text-gray-500 mb-1">Ano</div>
                <div class="font-semibold text-gray-900">{{ anuncio.ano }}</div>
              </div>
              <div v-if="anuncio.horas_trabalhadas" class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-1">⏱️</div>
                <div class="text-xs text-gray-500 mb-1">Horas</div>
                <div class="font-semibold text-gray-900">{{ formatNumber(anuncio.horas_trabalhadas) }}h</div>
              </div>
              <div v-if="anuncio.cor" class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-1">🎨</div>
                <div class="text-xs text-gray-500 mb-1">Cor</div>
                <div class="font-semibold text-gray-900">{{ anuncio.cor }}</div>
              </div>
            </div>

            <!-- Descrição -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-3">Descrição</h2>
              <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {{ anuncio.descricao || 'Sem descrição disponível.' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar (Preço e Contato) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div class="mb-6">
              <div class="text-sm text-gray-500 mb-2">Preço</div>
              <div class="text-4xl font-bold text-green-600">
                R$ {{ formatPrice(anuncio.preco) }}
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <button class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Ligar para o vendedor
              </button>
              
              <button class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar mensagem
              </button>
            </div>

            <div class="pt-6 border-t">
              <h3 class="font-semibold text-gray-900 mb-3">Informações do anúncio</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">ID do anúncio:</span>
                  <span class="font-medium">#{{ anuncio.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Publicado em:</span>
                  <span class="font-medium">{{ dataPublicacao }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Atualizado em:</span>
                  <span class="font-medium">{{ dataAtualizacao }}</span>
                </div>
              </div>
            </div>

            <!-- Botão de Favoritar -->
            <button class="w-full mt-4 border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:border-green-600 hover:text-green-600 transition-colors flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Adicionar aos favoritos
            </button>
          </div>
        </div>
      </div>

      <!-- Anúncios Relacionados (opcional, pode implementar depois) -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Anúncios Relacionados</h2>
        <div class="text-gray-500 text-center py-8">
          Funcionalidade de anúncios relacionados será implementada em breve.
        </div>
      </div>
    </div>

    <!-- Lightbox para visualização em tela cheia -->
    <ClientOnly>
      <ImageLightbox
        v-model:isOpen="isLightboxOpen"
        :images="imagens"
        :initialIndex="currentImageIndex"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ImageLightbox from '~/components/gallery/ImageLightbox.vue'

const route = useRoute()
const api = useApi()

const anuncio = ref<any>(null)
const loading = ref(true)
const error = ref('')
const imagemAtual = ref<string | null>(null)
const currentImageIndex = ref(0)
const isLightboxOpen = ref(false)

const imagens = computed(() => {
  if (!anuncio.value?.imagens || anuncio.value.imagens.length === 0) {
    return []
  }
  return anuncio.value.imagens.map((img: any) => img.url || img)
})

const localizacao = computed(() => {
  if (!anuncio.value) return ''
  const parts = []
  if (anuncio.value.municipio?.nome) parts.push(anuncio.value.municipio.nome)
  if (anuncio.value.estado?.sigla) parts.push(anuncio.value.estado.sigla)
  return parts.join(' - ')
})

const dataPublicacao = computed(() => {
  if (!anuncio.value?.criado_em) return ''
  return new Date(anuncio.value.criado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

const dataAtualizacao = computed(() => {
  if (!anuncio.value?.atualizado_em) return ''
  return new Date(anuncio.value.atualizado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

// Funções de navegação da galeria
function selectImage(index: number) {
  currentImageIndex.value = index
  imagemAtual.value = imagens.value[index]
}

function prevImage() {
  if (currentImageIndex.value > 0) {
    selectImage(currentImageIndex.value - 1)
  }
}

function nextImage() {
  if (currentImageIndex.value < imagens.value.length - 1) {
    selectImage(currentImageIndex.value + 1)
  }
}

function openLightbox(index: number) {
  currentImageIndex.value = index
  isLightboxOpen.value = true
}

// Watch para atualizar imagemAtual quando currentImageIndex mudar
watch(currentImageIndex, (newIndex) => {
  if (imagens.value.length > 0) {
    imagemAtual.value = imagens.value[newIndex]
  }
})

onMounted(async () => {
  try {
    loading.value = true
    const id = parseInt(route.params.id as string)
    
    if (isNaN(id)) {
      error.value = 'ID do anúncio inválido'
      return
    }

    anuncio.value = await api.getAnuncio(id)
    
    // Definir primeira imagem como atual
    if (imagens.value.length > 0) {
      imagemAtual.value = imagens.value[0]
      currentImageIndex.value = 0
    }
  } catch (err: any) {
    console.error('Erro ao carregar anúncio:', err)
    error.value = err.data?.message || 'Anúncio não encontrado'
  } finally {
    loading.value = false
  }
})

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function formatNumber(value: number) {
  return value.toLocaleString('pt-BR')
}

// SEO
useHead({
  title: anuncio.value ? `${anuncio.value.titulo} - AgroMaq` : 'Anúncio - AgroMaq',
  meta: [
    { name: 'description', content: anuncio.value?.descricao || 'Veja os detalhes deste anúncio' }
  ]
})
</script>

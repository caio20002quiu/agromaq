<template>
  <NuxtLink 
  :to="`/anuncios/${machine.id}`" 
  class="group block bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 h-full min-h-[400px] flex flex-col justify-between border border-gray-100"
>

  
    <!-- Imagem -->
    <div class="relative h-52 bg-gray-100 overflow-hidden flex-shrink-0">
  <img 
    v-if="imagemPrincipal" 
    :src="imagemPrincipal"
    :alt="machine.titulo"
    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
    loading="lazy"
  />
      <div v-else class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      
      <!-- Badges -->
      <div v-if="machine.categoria" 
       class="absolute top-3 left-3 bg-green-600/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-semibold shadow"
      >
        {{ machine.categoria.nome }}
      </div>
      <div v-if="machine.ano" class="absolute top-3 right-3 bg-gray-900 bg-opacity-80 text-white px-2.5 py-1 rounded-md text-xs font-medium shadow-md">
        {{ machine.ano }}
      </div>
      <div v-if="isNovo" class="absolute bottom-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-md">
        NOVO
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="p-4 flex flex-col flex-1">
      <!-- Título -->
      <h3 class="font-semibold text-base text-gray-900 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-green-700 transition-colors">
        {{ machine.titulo }}
      </h3>

      <!-- Localização -->
      <p v-if="localizacao" class="text-gray-500 text-sm mb-3 flex items-center">
        <svg class="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span class="truncate">{{ localizacao }}</span>
      </p>

      <!-- Detalhes -->
      <div class="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-4">
        <span v-if="machine.horas_trabalhadas" class="bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
          {{ formatNumber(machine.horas_trabalhadas) }}h
        </span>
        <span v-if="machine.marca" class="bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md truncate max-w-[110px]">
          {{ machine.marca.nome }}
        </span>
        <span v-if="machine.modelo" class="bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md truncate max-w-[110px]">
          {{ machine.modelo.nome }}
        </span>
      </div>

      <!-- Preço e Ação -->
      <div class="mt-auto pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-2xl font-extrabold text-green-700 tracking-tight truncate">
              R$ {{ formatPrice(machine.preco) }}
            </div>
          </div>
          <span class="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow hover:shadow-md active:scale-95"
          >
            Ver detalhes
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Machine } from '~/types/machine'

const props = defineProps<{ machine: Machine }>()

const imagemPrincipal = computed(() => {
  console.log(`[MachineCard ${props.machine.id}] Imagens:`, props.machine.imagens)
  
  if (!props.machine.imagens || props.machine.imagens.length === 0) {
    console.log(`[MachineCard ${props.machine.id}] Sem imagens`)
    return null
  }
  
  const principal = props.machine.imagens.find(img => img.principal)
  const url = principal?.url || props.machine.imagens[0]?.url || null
  
  console.log(`[MachineCard ${props.machine.id}] URL selecionada:`, url)
  return url
})

const isNovo = computed(() => {
  if (!props.machine.ano) return false
  const anoAtual = new Date().getFullYear()
  return props.machine.ano >= anoAtual
})

const localizacao = computed(() => {
  if (props.machine.municipio && props.machine.estado) {
    return `${props.machine.municipio.nome}/${props.machine.estado.sigla}`
  }
  return null
})

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
</script>
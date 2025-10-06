<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Categorias de Máquinas</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="category in categories" :key="category.name" class="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200">
        <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path :d="category.icon"/>
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800 mb-2">{{ category.name }}</h3>
        <p class="text-sm text-gray-500">{{ category.count }} anúncios</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/machine'
const props = defineProps<{ categories: Category[] }>()
const categories = props.categories
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-12">
      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Máquinas em Destaque</h2>
        <p class="text-gray-600">{{ machines.length }} máquinas disponíveis</p>
      </div>
    </div>
    
    <div v-if="machines.length === 0" class="text-center py-16 bg-white rounded-lg">
      <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Nenhum anúncio encontrado</h3>
      <p class="text-gray-500">Seja o primeiro a anunciar uma máquina!</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <MachineCard v-for="m in machines" :key="m.id" :machine="m" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MachineCard from '~/components/machine/MachineCard.vue'
import type { Machine } from '~/types/machine'

const props = defineProps<{ machines: Machine[] }>()
const machines = props.machines
</script>

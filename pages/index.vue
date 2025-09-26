<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Encontre a Máquina Agrícola Perfeita
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-green-100">
            A plataforma especializada que conecta vendedores e compradores de máquinas agrícolas
          </p>
          
          <!-- Search Bar -->
          <div class="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <select class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Tipo de Máquina</option>
                  <option value="trator">Trator</option>
                  <option value="colheitadeira">Colheitadeira</option>
                  <option value="pulverizador">Pulverizador</option>
                  <option value="plantadeira">Plantadeira</option>
                  <option value="implementos">Implementos</option>
                </select>
              </div>
              <div class="flex-1">
                <select class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Marca</option>
                  <option value="john-deere">John Deere</option>
                  <option value="case">Case</option>
                  <option value="massey-ferguson">Massey Ferguson</option>
                  <option value="new-holland">New Holland</option>
                  <option value="valtra">Valtra</option>
                </select>
              </div>
              <button class="btn-primary px-8 py-3">
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          Categorias de Máquinas
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div v-for="category in categories" :key="category.name" 
               class="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path :d="category.icon"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ category.count }} anúncios</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Machines -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800">
            Máquinas em Destaque
          </h2>
          <NuxtLink to="/maquinas" class="text-green-600 hover:text-green-700 font-medium">
            Ver todas →
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="machine in featuredMachines" :key="machine.id" 
               class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="h-48 bg-gray-200 relative">
              <img :src="machine.image" :alt="machine.title" 
                   class="w-full h-full object-cover" v-if="machine.image">
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div class="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                {{ machine.type }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="font-bold text-lg mb-2">{{ machine.title }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ machine.location }}</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-green-600">
                  R$ {{ machine.price.toLocaleString('pt-BR') }}
                </span>
                <button class="text-green-600 hover:text-green-700 font-medium">
                  Ver detalhes →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-green-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Pronto para Anunciar sua Máquina?
        </h2>
        <p class="text-xl mb-8 text-green-100">
          Cadastre seu anúncio gratuitamente e alcance milhares de compradores interessados
        </p>
        <NuxtLink to="/anunciar" class="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-block">
          Anunciar Gratuitamente
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">


// Dados mockados para demonstração
const categories = [
  {
    name: 'Tratores',
    count: 156,
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    name: 'Colheitadeiras',
    count: 89,
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    name: 'Pulverizadores',
    count: 67,
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    name: 'Plantadeiras',
    count: 45,
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    name: 'Implementos',
    count: 234,
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  }
]

const featuredMachines = [
  {
    id: 1,
    title: 'Trator John Deere 6100J - 2018',
    type: 'Trator',
    price: 285000,
    location: 'Ribeirão Preto, SP',
    image: null
  },
  {
    id: 2,
    title: 'Colheitadeira Case IH 2166 - 2015',
    type: 'Colheitadeira',
    price: 450000,
    location: 'Sorriso, MT',
    image: null
  },
  {
    id: 3,
    title: 'Pulverizador Jacto Uniport 3030 - 2019',
    type: 'Pulverizador',
    price: 195000,
    location: 'Rio Verde, GO',
    image: null
  }
]

// SEO Meta

</script>

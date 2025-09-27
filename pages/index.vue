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
          <div class="bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione</option>
                  <option value="trator">Trator</option>
                  <option value="colheitadeira">Colheitadeira</option>
                  <option value="pulverizador">Pulverizador</option>
                  <option value="plantadeira">Plantadeira</option>
                  <option value="implementos">Implementos</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione</option>
                  <option value="john-deere">John Deere</option>
                  <option value="case">Case</option>
                  <option value="massey-ferguson">Massey Ferguson</option>
                  <option value="new-holland">New Holland</option>
                  <option value="valtra">Valtra</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019 ou anterior</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Preço até</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione</option>
                  <option value="100000">R$ 100.000</option>
                  <option value="200000">R$ 200.000</option>
                  <option value="300000">R$ 300.000</option>
                  <option value="500000">R$ 500.000</option>
                  <option value="1000000">R$ 1.000.000+</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <button class="btn-primary w-full px-6 py-3">
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <div class="lg:w-80 bg-gray-50 rounded-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Buscar</h3>
            
            <!-- Tipo -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Tipo:</label>
              <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option value="">SELECIONE</option>
                <option value="trator">Tratores</option>
                <option value="colheitadeira">Colheitadeiras</option>
                <option value="pulverizador">Pulverizadores</option>
                <option value="plantadeira">Plantadeiras</option>
                <option value="implementos">Implementos</option>
              </select>
            </div>

            <!-- Marcas -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Marcas:</label>
              <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option value="">SELECIONE</option>
                <option value="john-deere">John Deere</option>
                <option value="case">Case IH</option>
                <option value="new-holland">New Holland</option>
                <option value="massey-ferguson">Massey Ferguson</option>
                <option value="valtra">Valtra</option>
                <option value="fendt">Fendt</option>
              </select>
            </div>

            <!-- Modelo -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Digite o modelo</label>
              <input type="text" placeholder="Digite aqui..." 
                     class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
            </div>

            <!-- Botão de Busca -->
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              🔍 BUSCAR
            </button>

            <!-- Busca Detalhada -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-blue-600 mb-3 cursor-pointer hover:text-blue-700">
                🔍 BUSCA DETALHADA
              </h4>
            </div>

            <!-- Busca por Categoria -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-blue-600 mb-3 cursor-pointer hover:text-blue-700">
                📂 BUSCA POR CATEGORIA
              </h4>
            </div>
          </div>

          <!-- Categories Grid -->
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-800 mb-8">
              Categorias de Máquinas
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="category in categories" :key="category.name" 
                   class="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200">
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
        </div>
      </div>
    </section>

    <!-- Featured Machines -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              Máquinas em Destaque
            </h2>
            <p class="text-gray-600">{{ featuredMachines.length }} máquinas disponíveis</p>
          </div>
          <NuxtLink to="/maquinas" class="text-green-600 hover:text-green-700 font-semibold flex items-center">
            Ver todas
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="machine in featuredMachines" :key="machine.id" 
               class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="h-48 bg-gray-200 relative overflow-hidden">
              <img :src="machine.image" :alt="machine.title" 
                   class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" v-if="machine.image">
              <div v-else class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div class="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {{ machine.type }}
              </div>
              <div class="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                {{ machine.year }}
              </div>
              <div v-if="machine.isNew" class="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                NOVO
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-1 text-gray-800">{{ machine.title }}</h3>
              <p class="text-gray-500 text-sm mb-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ machine.location }}
              </p>
              <div class="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                <span>{{ machine.hours }}h</span>
                <span>{{ machine.brand }}</span>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-2xl font-bold text-green-600">
                    R$ {{ machine.price.toLocaleString('pt-BR') }}
                  </span>
                  <div class="text-xs text-gray-500 mt-1">
                    ou {{ machine.installments }}x de R$ {{ Math.round(machine.price / machine.installments).toLocaleString('pt-BR') }}
                  </div>
                </div>
                <button class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            Destaque em Números
          </h2>
          <p class="text-gray-600">A maior plataforma de máquinas agrícolas do Brasil</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">1.2M+</div>
            <div class="text-gray-700 font-medium">Anúncios Publicados</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">45K+</div>
            <div class="text-gray-700 font-medium">Vendedores Ativos</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">320K+</div>
            <div class="text-gray-700 font-medium">Compradores</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">15+</div>
            <div class="text-gray-700 font-medium">Anos de Mercado</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="lg:w-2/3 mb-8 lg:mb-0">
            <h2 class="text-3xl font-bold mb-4">
              Pronto para Anunciar sua Máquina?
            </h2>
            <p class="text-xl text-green-100 mb-6">
              Cadastre seu anúncio gratuitamente e alcance milhares de compradores interessados em todo o Brasil
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/anunciar" class="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-block text-center">
                Anunciar Gratuitamente
              </NuxtLink>
              <NuxtLink to="/sobre" class="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-lg transition-colors inline-block text-center">
                Saiba Mais
              </NuxtLink>
            </div>
          </div>
          <div class="lg:w-1/3 text-center">
            <div class="bg-white bg-opacity-10 rounded-lg p-6">
              <div class="text-2xl font-bold mb-2">0%</div>
              <div class="text-green-100">Taxa de Comissão</div>
              <div class="text-sm text-green-200 mt-2">Anuncie sem custos</div>
            </div>
          </div>
        </div>
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
    title: 'Trator John Deere 6110J',
    type: 'Trator',
    brand: 'John Deere',
    year: '2021',
    price: 385000,
    installments: 48,
    location: 'Ribeirão Preto, SP',
    hours: '2.580',
    isNew: false,
    image: null
  },
  {
    id: 2,
    title: 'Case IH Axial Flow 2166',
    type: 'Colheitadeira',
    brand: 'Case IH',
    year: '2019',
    price: 650000,
    installments: 60,
    location: 'Sorriso, MT',
    hours: '1.850',
    isNew: false,
    image: null
  },
  {
    id: 3,
    title: 'Pulverizador Jacto Uniport 3030',
    type: 'Pulverizador',
    brand: 'Jacto',
    year: '2022',
    price: 285000,
    installments: 36,
    location: 'Rio Verde, GO',
    hours: '1.200',
    isNew: false,
    image: null
  },
  {
    id: 4,
    title: 'New Holland T7.245',
    type: 'Trator',
    brand: 'New Holland',
    year: '2023',
    price: 520000,
    installments: 48,
    location: 'Cascavel, PR',
    hours: '850',
    isNew: true,
    image: null
  },
  {
    id: 5,
    title: 'Massey Ferguson 9895',
    type: 'Colheitadeira',
    brand: 'Massey Ferguson',
    year: '2020',
    price: 720000,
    installments: 60,
    location: 'Dourados, MS',
    hours: '2.100',
    isNew: false,
    image: null
  },
  {
    id: 6,
    title: 'Valtra BT210',
    type: 'Trator',
    brand: 'Valtra',
    year: '2021',
    price: 295000,
    installments: 42,
    location: 'Barreiras, BA',
    hours: '1.950',
    isNew: false,
    image: null
  },
  {
    id: 7,
    title: 'John Deere S770',
    type: 'Colheitadeira',
    brand: 'John Deere',
    year: '2024',
    price: 1250000,
    installments: 72,
    location: 'Primavera do Leste, MT',
    hours: '420',
    isNew: true,
    image: null
  },
  {
    id: 8,
    title: 'Plantadeira John Deere 2126',
    type: 'Plantadeira',
    brand: 'John Deere',
    year: '2020',
    price: 175000,
    installments: 36,
    location: 'Uberaba, MG',
    hours: '1.680',
    isNew: false,
    image: null
  }
]

// SEO Meta

</script>

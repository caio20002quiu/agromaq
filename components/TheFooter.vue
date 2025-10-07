<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold">AgroMaq</h2>
          </div>
          <p class="text-gray-300 mb-4">
            A plataforma especializada em máquinas agrícolas que conecta vendedores e compradores 
            do setor agrícola de forma eficiente e confiável.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold mb-4">Links Rápidos</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">Início</NuxtLink></li>
            <li><NuxtLink to="/login" class="text-gray-300 hover:text-white transition-colors">Entrar</NuxtLink></li>
            <li><NuxtLink to="/register" class="text-gray-300 hover:text-white transition-colors">Cadastrar</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="font-semibold mb-4">Contato</h3>
          <ul class="space-y-2">
            <li class="text-gray-300">
              <span class="block">Email:</span>
              <a href="mailto:contato@agromaq.com" class="hover:text-white transition-colors">
                contato@agromaq.com
              </a>
            </li>
            <li class="text-gray-300">
              <span class="block">Telefone:</span>
              <a href="tel:+5511999999999" class="hover:text-white transition-colors">
                (11) 99999-9999
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-300">
          &copy; {{ new Date().getFullYear() }} AgroMaq. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

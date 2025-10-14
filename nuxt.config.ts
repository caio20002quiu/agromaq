// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  css: ['~/assets/css/main.css'],

  // Auto-import de componentes (incluindo subpastas)
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  // Desabilitar SSR para rotas autenticadas
  ssr: true,
  
  routeRules: {
    '/dashboard/**': { ssr: false },
    '/login': { ssr: false },
    '/register': { ssr: false }
  },

  // Configuração de runtime (variáveis públicas)
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://agromaq-back.vercel.app/api'
    }
  }
})

// Composable para fazer chamadas à API do backend NestJS
export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl || 'http://localhost:4000/api'

  // Função helper para obter headers com token
  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (import.meta.client) {
      const authData = localStorage.getItem('auth')
      if (authData) {
        try {
          const { token } = JSON.parse(authData)
          if (token) {
            headers['Authorization'] = `Bearer ${token}`
          }
        } catch (error) {
          // Ignorar erro
        }
      }
    }

    return headers
  }

  const api = $fetch.create({
    baseURL,
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        ...getHeaders()
      }
    }
  })

  return {
    // Auth
    login: (email: string, password: string) => 
      api('/auth/login', { method: 'POST', body: { email, senha: password } }),
    
    register: (data: any) => 
      api('/auth/register', { method: 'POST', body: data }),

    // Anúncios
    getAnuncios: async (params?: any) => {
      const response: any = await api('/anuncios', { params })
      return response
    },
    
    getAnuncio: (id: number) => 
      api(`/anuncios/${id}`),
    
    createAnuncio: (data: any) => 
      api('/anuncios', { method: 'POST', body: data }),
    
    getMeusAnuncios: () => 
      api('/anuncios/dashboard/meus'),
    
    updateAnuncio: (id: number, data: any) => 
      api(`/anuncios/${id}`, { method: 'PATCH', body: data }),
    
    toggleAnuncio: (id: number) => 
      api(`/anuncios/${id}/toggle`, { method: 'PATCH' }),
    
    deleteAnuncio: (id: number) => 
      api(`/anuncios/${id}`, { method: 'DELETE' }),

    // Categorias
    getCategorias: () => 
      api('/categorias'),

    // Marcas
    getMarcas: () => 
      api('/marcas'),

    // Modelos
    getModelos: (marcaId: number) => 
      api('/modelos', { params: { marca: marcaId } }),

    // Localizações
    getEstados: () => 
      api('/localizacoes/estados'),
    
    getMunicipios: (uf: string) => 
      api('/localizacoes/municipios', { params: { uf } }),

    // Upload de Imagens
    uploadImagens: async (formData: FormData) => {
      // Para FormData, não definimos Content-Type (o browser faz automaticamente)
      const headers: Record<string, string> = {}
      
      if (import.meta.client) {
        const authData = localStorage.getItem('auth')
        if (authData) {
          try {
            const { token } = JSON.parse(authData)
            if (token) {
              headers['Authorization'] = `Bearer ${token}`
            }
          } catch (error) {
            // Ignorar erro
          }
        }
      }

      return $fetch(`${baseURL}/upload/imagens`, {
        method: 'POST',
        body: formData,
        headers
      })
    },
  }
}

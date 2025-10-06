import { ref } from 'vue'
import type { Machine, Category } from '~/types/machine'

export function useMachines() {
  const machines = ref<Machine[]>([])
  const categories = ref<Category[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)
  const api = useApi()

  async function refresh() {
    pending.value = true
    error.value = null
    try {
      console.log('🔍 [useMachines] Buscando anúncios e categorias...')
      // Usando o backend NestJS
      const [anuncios, cats] = await Promise.all([
        api.getAnuncios(),
        api.getCategorias()
      ])
      console.log('✅ [useMachines] Anúncios recebidos:', anuncios)
      console.log('✅ [useMachines] Categorias recebidas:', cats)
      machines.value = anuncios as any || []
      categories.value = cats as any || []
      console.log('✅ [useMachines] Total de máquinas:', machines.value.length)
    } catch (err: any) {
      error.value = err
      console.error('❌ [useMachines] Error fetching machines:', err)
    } finally {
      pending.value = false
    }
  }

  // Carregar dados inicialmente
  refresh()

  return { machines, categories, pending, error, refresh }
}

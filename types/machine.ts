export type Category = {
  id?: number
  name?: string
  nome?: string
  count?: number
  icon?: string
}

export type Machine = {
  id: number | string
  titulo?: string
  title?: string
  type?: string
  brand?: string
  year?: string | number
  price?: number
  preco?: number
  installments?: number
  location?: string
  hours?: string | number
  isNew?: boolean
  image?: string | null
  ativo?: boolean
  ano?: number
  horas_trabalhadas?: number
  cor?: string
  descricao?: string
  id_categoria?: number
  id_marca?: number
  id_modelo?: number
  id_estado?: number
  id_municipio?: number
  id_usuario?: number
  criado_em?: string
  atualizado_em?: string
  categoria?: { id: number; nome: string }
  marca?: { id: number; nome: string }
  modelo?: { id: number; nome: string }
  estado?: { id: number; sigla: string; nome: string }
  municipio?: { id: number; nome: string }
  imagens?: Array<{ id?: number; url: string; principal?: boolean }>
  usuario?: { id: number; nome: string; telefone?: string; email: string }
}

export type DashboardStats = {
  totalAnuncios: number
  anunciosAtivos: number
  visualizacoes: number
  favoritos: number
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function upsertUsuario() {
  const email = 'admin@local'
  let user = await prisma.usuarios.findUnique({ where: { email } })
  if (!user) {
  user = await prisma.usuarios.create({ data: { nome: 'Admin', cpf_cnpj: 0n, email, senha_hash: 'hash', telefone: '0000' } })
  }
  return user
}

async function upsertMarca(nome: string) {
  let marca = await prisma.marcas.findUnique({ where: { nome } })
  if (!marca) marca = await prisma.marcas.create({ data: { nome } })
  return marca
}

async function upsertCategoria(nome: string) {
  let categoria = await prisma.categorias.findUnique({ where: { nome } })
  if (!categoria) categoria = await prisma.categorias.create({ data: { nome } })
  return categoria
}

async function findOrCreateLocalizacao(estado: string, cidade: string) {
  let local = await prisma.localizacoes.findFirst({ where: { estado, cidade } })
  if (!local) local = await prisma.localizacoes.create({ data: { estado, cidade } })
  return local
}

async function main() {
  const user = await upsertUsuario()
  const marca = await upsertMarca('John Deere')
  const categoria = await upsertCategoria('Trator')
  const local = await findOrCreateLocalizacao('SP', 'Ribeirão Preto')

  // Avoid creating duplicate anuncio by checking a combination of title and user
  const titulo = 'Trator John Deere 6110J'
  const existing = await prisma.anuncios.findFirst({ where: { titulo, id_usuario: user.id } })
  if (!existing) {
    await prisma.anuncios.create({ data: {
      id_usuario: user.id,
      id_categoria: categoria.id,
      id_marca: marca.id,
      id_modelo: undefined,
      id_localizacao: local.id,
      titulo,
      descricao: 'Exemplo',
      preco: 385000,
      ano: 2021,
      horas_trabalhadas: 2580,
      cor: 'Verde',
      ativo: true
    }})
  }
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())

import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class AnunciosService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: PrismaClient,
    private uploadService: UploadService
  ) {}

  // Listar todos os anúncios ativos com filtros
  async findAll(query: any) {
    const { 
      limit = 50, 
      offset = 0,
      // Filtros simples
      id_categoria,
      id_marca,
      id_modelo,
      // Filtros avançados
      ano_min,
      ano_max,
      preco_min,
      preco_max,
      horas_min,
      horas_max,
      id_estado,
      id_municipio,
      busca, // busca por texto no título ou descrição
    } = query;

    // Construir objeto where dinamicamente
    const where: any = { ativo: true };

    // Filtros simples
    if (id_categoria) where.id_categoria = parseInt(id_categoria);
    if (id_marca) where.id_marca = parseInt(id_marca);
    if (id_modelo) where.id_modelo = parseInt(id_modelo);

    // Filtros de localização
    if (id_estado) where.id_estado = parseInt(id_estado);
    if (id_municipio) where.id_municipio = parseInt(id_municipio);

    // Filtros de range (ano)
    if (ano_min || ano_max) {
      where.ano = {};
      if (ano_min) where.ano.gte = parseInt(ano_min);
      if (ano_max) where.ano.lte = parseInt(ano_max);
    }

    // Filtros de range (preço)
    if (preco_min || preco_max) {
      where.preco = {};
      if (preco_min) where.preco.gte = parseFloat(preco_min);
      if (preco_max) where.preco.lte = parseFloat(preco_max);
    }

    // Filtros de range (horas trabalhadas)
    if (horas_min || horas_max) {
      where.horas_trabalhadas = {};
      if (horas_min) where.horas_trabalhadas.gte = parseInt(horas_min);
      if (horas_max) where.horas_trabalhadas.lte = parseInt(horas_max);
    }

    // Busca por texto
    if (busca) {
      where.OR = [
        { titulo: { contains: busca, mode: 'insensitive' } },
        { descricao: { contains: busca, mode: 'insensitive' } },
      ];
    }

    const anuncios = await this.prisma.anuncios.findMany({
      where,
      include: {
        categoria: true,
        marca: true,
        modelo: true,
        estado: true,
        municipio: true,
        imagens: {
          orderBy: { principal: 'desc' },
        },
      },
      orderBy: { criado_em: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    // Contar total de resultados para paginação
    const total = await this.prisma.anuncios.count({ where });

    return {
      data: anuncios,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    };
  }

  // Buscar anúncio por ID
  async findOne(id: number) {
    const anuncio = await this.prisma.anuncios.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true,
        modelo: true,
        estado: true,
        municipio: true,
        imagens: {
          orderBy: { principal: 'desc' },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
          },
        },
      },
    });

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    return anuncio;
  }

  // Criar novo anúncio
  async create(data: any, userId: number) {
    const {
      titulo,
      id_categoria,
      id_marca,
      id_modelo,
      preco,
      ano,
      horas_trabalhadas,
      cor,
      id_estado,
      id_municipio,
      descricao,
      imagens,
    } = data;

    const anuncio = await this.prisma.anuncios.create({
      data: {
        id_usuario: userId,
        titulo,
        id_categoria: id_categoria ? parseInt(id_categoria) : null,
        id_marca: id_marca ? parseInt(id_marca) : null,
        id_modelo: id_modelo ? parseInt(id_modelo) : null,
        preco: parseFloat(preco),
        ano: ano ? parseInt(ano) : null,
        horas_trabalhadas: horas_trabalhadas ? parseInt(horas_trabalhadas) : null,
        cor: cor || null,
        id_estado: id_estado ? parseInt(id_estado) : null,
        id_municipio: id_municipio ? parseInt(id_municipio) : null,
        descricao: descricao || null,
        ativo: true,
        atualizado_em: new Date(),
      },
    });

    // Adicionar imagens se fornecidas
    console.log('[AnunciosService] Imagens recebidas:', imagens);
    if (imagens && Array.isArray(imagens) && imagens.length > 0) {
      const imagensData = imagens.map((url: string, index: number) => ({
        id_anuncio: anuncio.id,
        url,
        principal: index === 0,
      }));

      console.log('[AnunciosService] Salvando imagens:', imagensData);
      await this.prisma.anuncio_imagens.createMany({
        data: imagensData,
      });
      console.log('[AnunciosService] Imagens salvas com sucesso');
    }

    // Buscar anúncio completo com imagens
    const anuncioCompleto = await this.prisma.anuncios.findUnique({
      where: { id: anuncio.id },
      include: {
        imagens: {
          orderBy: { principal: 'desc' },
        },
      },
    });

    console.log('[AnunciosService] Anúncio completo:', anuncioCompleto);
    return { status: 'ok', message: 'Anúncio criado com sucesso', data: anuncioCompleto };
  }

  // Listar anúncios do usuário
  async findUserAnuncios(userId: number) {
    const anuncios = await this.prisma.anuncios.findMany({
      where: { id_usuario: userId },
      include: {
        categoria: true,
        marca: true,
        modelo: true,
        estado: true,
        municipio: true,
        imagens: {
          where: { principal: true },
          take: 1,
        },
      },
      orderBy: { criado_em: 'desc' },
    });

    // Calcular estatísticas
    const totalAnuncios = anuncios.length;
    const anunciosAtivos = anuncios.filter((a) => a.ativo).length;

    return {
      anuncios,
      stats: {
        totalAnuncios,
        anunciosAtivos,
        visualizacoes: 0, // Implementar depois
        favoritos: 0, // Implementar depois
      },
    };
  }

  // Atualizar anúncio
  async update(id: number, data: any, userId: number) {
    const anuncio = await this.prisma.anuncios.findUnique({
      where: { id },
    });

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    if (anuncio.id_usuario !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este anúncio');
    }

    const {
      titulo,
      id_categoria,
      id_marca,
      id_modelo,
      preco,
      ano,
      horas_trabalhadas,
      cor,
      id_estado,
      id_municipio,
      descricao,
      imagens,
    } = data;

    // Atualizar anúncio
    const updated = await this.prisma.anuncios.update({
      where: { id },
      data: {
        titulo,
        id_categoria: id_categoria ? parseInt(id_categoria) : null,
        id_marca: id_marca ? parseInt(id_marca) : null,
        id_modelo: id_modelo ? parseInt(id_modelo) : null,
        preco: preco ? parseFloat(preco) : null,
        ano: ano ? parseInt(ano) : null,
        horas_trabalhadas: horas_trabalhadas ? parseInt(horas_trabalhadas) : null,
        cor: cor || null,
        id_estado: id_estado ? parseInt(id_estado) : null,
        id_municipio: id_municipio ? parseInt(id_municipio) : null,
        descricao: descricao || null,
        atualizado_em: new Date(),
      },
    });

    // Atualizar imagens se fornecidas
    if (imagens && Array.isArray(imagens)) {
      // Remover imagens antigas
      await this.prisma.anuncio_imagens.deleteMany({
        where: { id_anuncio: id },
      });

      // Adicionar novas imagens
      for (let i = 0; i < imagens.length; i++) {
        await this.prisma.anuncio_imagens.create({
          data: {
            id_anuncio: id,
            url: imagens[i],
            principal: i === 0,
          },
        });
      }
    }

    return updated;
  }

  // Toggle ativo/inativo
  async toggleActive(id: number, userId: number) {
    const anuncio = await this.prisma.anuncios.findUnique({
      where: { id },
    });

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    if (anuncio.id_usuario !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este anúncio');
    }

    const updated = await this.prisma.anuncios.update({
      where: { id },
      data: { ativo: !anuncio.ativo },
    });

    return { status: 'ok', message: 'Status atualizado', data: updated };
  }

  // Deletar anúncio e suas imagens do Storage
  async delete(id: number, userId: number) {
    console.log('[AnunciosService] Iniciando deleção do anúncio:', id);
    
    // Buscar anúncio com imagens
    const anuncio = await this.prisma.anuncios.findUnique({
      where: { id },
      include: {
        imagens: true,
      },
    });

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    if (anuncio.id_usuario !== userId) {
      throw new ForbiddenException('Você não tem permissão para deletar este anúncio');
    }

    console.log('[AnunciosService] Anúncio encontrado com', anuncio.imagens.length, 'imagens');

    // Deletar imagens do Supabase Storage
    if (anuncio.imagens && anuncio.imagens.length > 0) {
      const urls = anuncio.imagens.map(img => img.url);
      console.log('[AnunciosService] Deletando imagens do Storage:', urls);
      
      try {
        await this.uploadService.deleteMultipleImages(urls);
        console.log('[AnunciosService] Imagens deletadas do Storage com sucesso');
      } catch (error) {
        console.error('[AnunciosService] Erro ao deletar imagens do Storage:', error);
        // Continua mesmo se falhar (imagens órfãs no storage não são críticas)
      }
    }

    // Deletar anúncio (cascade vai deletar as imagens do banco)
    await this.prisma.anuncios.delete({
      where: { id },
    });

    console.log('[AnunciosService] Anúncio deletado com sucesso');
    return { message: 'Anúncio deletado com sucesso' };
  }
}

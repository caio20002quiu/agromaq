import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ModelosService {
  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) {}

  async findByMarca(marcaId: number) {
    if (!marcaId) return [];

    return this.prisma.modelos.findMany({
      where: { id_marca: marcaId },
      orderBy: { nome: 'asc' },
    });
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoriasService {
  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.categorias.findMany({
      orderBy: { nome: 'asc' },
    });
  }
}

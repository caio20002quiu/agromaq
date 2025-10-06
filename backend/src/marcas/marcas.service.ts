import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MarcasService {
  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.marcas.findMany({
      orderBy: { nome: 'asc' },
    });
  }
}

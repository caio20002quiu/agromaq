import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocalizacoesService {
  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) {}

  async findAllEstados() {
    return this.prisma.estados.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  async findMunicipiosByUf(uf: string) {
    if (!uf) {
      return [];
    }

    return this.prisma.municipio.findMany({
      where: { uf: uf.toUpperCase() },
      orderBy: { nome: 'asc' },
    });
  }
}

import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('anuncios')
export class AnunciosController {
  constructor(private readonly anunciosService: AnunciosService) {}

  // Listar todos os anúncios ativos (público)
  @Get()
  async findAll(@Query() query: any) {
    return this.anunciosService.findAll(query);
  }

  // Listar anúncios do usuário (autenticado) - DEVE VIR ANTES DO :id
  @Get('dashboard/meus')
  @UseGuards(JwtAuthGuard)
  async findUserAnuncios(@Request() req: any) {
    return this.anunciosService.findUserAnuncios(req.user.userId);
  }

  // Buscar anúncio por ID (público)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.anunciosService.findOne(parseInt(id));
  }

  // Criar novo anúncio (autenticado)
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAnuncioDto: any, @Request() req: any) {
    return this.anunciosService.create(createAnuncioDto, req.user.userId);
  }

  // Atualizar anúncio (autenticado)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateAnuncioDto: any, @Request() req: any) {
    return this.anunciosService.update(parseInt(id), updateAnuncioDto, req.user.userId);
  }

  // Toggle ativo/inativo (autenticado)
  @Patch(':id/toggle')
  @UseGuards(JwtAuthGuard)
  async toggleActive(@Param('id') id: string, @Request() req: any) {
    return this.anunciosService.toggleActive(parseInt(id), req.user.userId);
  }

  // Deletar anúncio (autenticado)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.anunciosService.delete(parseInt(id), req.user.userId);
  }
}

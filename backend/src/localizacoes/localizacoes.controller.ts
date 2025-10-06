import { Controller, Get, Query } from '@nestjs/common';
import { LocalizacoesService } from './localizacoes.service';

@Controller('localizacoes')
export class LocalizacoesController {
  constructor(private readonly localizacoesService: LocalizacoesService) {}

  @Get('estados')
  async findAllEstados() {
    return this.localizacoesService.findAllEstados();
  }

  @Get('municipios')
  async findMunicipiosByUf(@Query('uf') uf: string) {
    return this.localizacoesService.findMunicipiosByUf(uf);
  }
}

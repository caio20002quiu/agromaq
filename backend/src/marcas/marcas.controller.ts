import { Controller, Get, Query } from '@nestjs/common';
import { MarcasService } from './marcas.service';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Get()
  async findAll() {
    return this.marcasService.findAll();
  }
}

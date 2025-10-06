import { Controller, Get, Query } from '@nestjs/common';
import { ModelosService } from './modelos.service';

@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Get()
  async findByMarca(@Query('marca') marcaId: string) {
    return this.modelosService.findByMarca(parseInt(marcaId));
  }
}

import { Module } from '@nestjs/common';
import { LocalizacoesController } from './localizacoes.controller';
import { LocalizacoesService } from './localizacoes.service';

@Module({
  controllers: [LocalizacoesController],
  providers: [LocalizacoesService],
  exports: [LocalizacoesService],
})
export class LocalizacoesModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { AnunciosModule } from './anuncios/anuncios.module'
import { CategoriasModule } from './categorias/categorias.module'
import { MarcasModule } from './marcas/marcas.module'
import { ModelosModule } from './modelos/modelos.module'
import { LocalizacoesModule } from './localizacoes/localizacoes.module'
import { UploadModule } from './upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    AnunciosModule,
    CategoriasModule,
    MarcasModule,
    ModelosModule,
    LocalizacoesModule,
    UploadModule,
  ],
})
export class AppModule {}

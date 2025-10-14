import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Habilitar CORS para o frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://agromaq.vercel.app', // Seu domínio de produção
      /\.vercel\.app$/ // Aceita qualquer preview deploy da Vercel
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  // Prefixo global para todas as rotas
  app.setGlobalPrefix('api')

  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`🚀 Backend NestJS rodando em http://localhost:${port}/api`)
}

bootstrap()

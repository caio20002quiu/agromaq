import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { nome, email, senha, cpf_cnpj, telefone } = body

    if (!nome || !email || !senha || !cpf_cnpj) {
      throw new BadRequestException('Campos obrigatórios faltando')
    }

    return this.authService.register({ nome, email, senha, cpf_cnpj, telefone })
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, senha } = body

    if (!email || !senha) {
      throw new BadRequestException('Email e senha são obrigatórios')
    }

    return this.authService.login(email, senha)
  }
}

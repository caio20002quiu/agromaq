import { Injectable, Logger, Inject, UnauthorizedException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)
  private jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production'

  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) {}

  async register(data: any) {
    const { nome, email, senha, cpf_cnpj, telefone } = data

    // Validar CPF/CNPJ
    if (!cpf_cnpj) {
      return { status: 'error', message: 'CPF/CNPJ é obrigatório' }
    }

    const cpfCnpjNumber = BigInt(cpf_cnpj.replace(/\D/g, ''))
    const length = cpf_cnpj.replace(/\D/g, '').length
    
    if (length !== 11 && length !== 14) {
      return { status: 'error', message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos' }
    }

    // Verificar duplicatas
    const existingEmail = await this.prisma.usuarios.findUnique({ where: { email } })
    if (existingEmail) {
      return { status: 'error', message: 'Email já cadastrado' }
    }

    const existingCpfCnpj = await this.prisma.usuarios.findFirst({ 
      where: { cpf_cnpj: cpfCnpjNumber } 
    })
    if (existingCpfCnpj) {
      return { status: 'error', message: 'CPF/CNPJ já cadastrado' }
    }

    // Criar usuário
    const hash = await bcrypt.hash(senha, 10)
    const user = await this.prisma.usuarios.create({ 
      data: { 
        nome, 
        email, 
        cpf_cnpj: cpfCnpjNumber,
        senha_hash: hash, 
        telefone: telefone || null 
      } 
    })

    const token = jwt.sign({ userId: user.id, email: user.email }, this.jwtSecret, { expiresIn: '7d' })
    
    return { 
      status: 'ok', 
      data: { 
        user: { id: user.id, nome: user.nome, email: user.email }, 
        token 
      } 
    }
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.usuarios.findUnique({ 
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha_hash: true,
        ativo: true,
      }
    })

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    if (!user.ativo) {
      throw new UnauthorizedException('Usuário inativo')
    }

    const passwordValid = await bcrypt.compare(senha, user.senha_hash)
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, this.jwtSecret, { expiresIn: '7d' })
    
    return { 
      status: 'ok', 
      data: { 
        user: { id: user.id, nome: user.nome, email: user.email }, 
        token 
      } 
    }
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any
      return { userId: decoded.userId, email: decoded.email }
    } catch (err) {
      this.logger.warn('Invalid token')
      return null
    }
  }
}

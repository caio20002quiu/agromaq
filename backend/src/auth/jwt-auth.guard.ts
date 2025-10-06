import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.replace('Bearer ', '');
    const user = this.authService.verifyToken(token);

    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    request.user = user;
    return true;
  }
}

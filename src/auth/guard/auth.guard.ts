import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}

  /**
   * Verifica si el usuario esta autenticado mediante el token JWT proporcionado.
   * @param context El contexto de ejecucion de NestJS.
   * @returns Devuelve `true` si el usuario esta autenticado, de lo contrario, lanza una excepcion no autorizada.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(httpRequest);
    if (!token) {
      throw new UnauthorizedException('Token de autorizacion no proporcionado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });

      // Adjuntar los datos decodificados del usuario al objeto de solicitud para su uso posterior
      httpRequest['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [authorizationType, accessToken] = request.headers.authorization?.split(' ') ?? [];
    return authorizationType === 'Bearer' ? accessToken : undefined;
  }
}


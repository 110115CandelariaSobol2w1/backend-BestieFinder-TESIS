import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
 //inyectamos el jwt service
  constructor(private readonly jwtService: JwtService){}

  async canActivate(context: ExecutionContext) : Promise<boolean> {
    //obtenemos el objeto del request para acceder a los encabezados
    const request = context.switchToHttp().getRequest();
    //obtenemos el token del encabezado
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token,
        {
          secret: jwtConstants.secret
        }
      );
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined

  }
}
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.verify(token, {
      secret: process.env.SALT,
    });

    request['user'] = payload;
    return true;
  }
}

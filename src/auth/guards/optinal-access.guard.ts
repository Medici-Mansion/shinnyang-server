import { AuthService } from '../auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class OptinalAccessGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (token) {
      const payload = this.authService.verify(token, {
        secret: process.env.SALT,
      });
      request['user'] = payload;
    }

    return true;
  }
}

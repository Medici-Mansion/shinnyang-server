import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as JService, JwtVerifyOptions } from '@nestjs/jwt';
import { Payload } from './dto/jwt.dto';

@Injectable()
export class JwtService {
  constructor(private readonly jService: JService) {}
  sign(id: number) {
    const payload: Payload = {
      id,
    };
    return {
      access: this.jService.sign(payload, {
        secret: process.env.SALT,
        expiresIn: process.env.EXPIRESTOKEN,
      }),
      refresh: this.jService.sign(payload, {
        secret: process.env.SALT,
        expiresIn: process.env.RES_EXPIRESTOKEN,
      }),
    };
  }

  verify(token: string, options: JwtVerifyOptions): Payload {
    try {
      return this.jService.verify<Payload>(token, options);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

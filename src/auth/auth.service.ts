import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT, Payload } from './dtos/jwt.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async refreshToken(refresh: string): Promise<JWT> {
    this.verify(refresh, {
      secret: process.env.SALT,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: { refresh },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const tokens = this.sign(user.id);
      await this.dataSource.manager.update(
        User,
        { id: user.id },
        { refresh: tokens.refresh },
      );
      await queryRunner.commitTransaction();
      return tokens;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error('트랜잭션 에러 발생');
    } finally {
      await queryRunner.release();
    }
  }

  sign(id: number) {
    const payload: Payload = {
      id,
    };
    return new JWT({
      access: this.jwtService.sign(payload, {
        secret: process.env.SALT,
        expiresIn: process.env.EXPIRESTOKEN,
      }),
      refresh: this.jwtService.sign(payload, {
        secret: process.env.SALT,
        expiresIn: process.env.RES_EXPIRESTOKEN,
      }),
    });
  }

  verify(token: string, options: JwtVerifyOptions): Payload {
    try {
      return this.jwtService.verify<Payload>(token, options);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

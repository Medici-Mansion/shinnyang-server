import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { HttpModule } from '@nestjs/axios';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { JwtService } from 'src/jwt/jwt.service';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService],
})
export class AuthModule {}

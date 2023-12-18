import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

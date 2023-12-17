import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}

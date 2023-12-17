import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}

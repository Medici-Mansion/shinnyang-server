import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { TransactionExceptionFilter } from 'src/common/exception-filter/transaction-exception.filter';
@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    AuthRepository,
    {
      provide: APP_FILTER,
      useClass: TransactionExceptionFilter,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

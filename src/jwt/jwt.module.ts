import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as JModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JModule.register({})],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}

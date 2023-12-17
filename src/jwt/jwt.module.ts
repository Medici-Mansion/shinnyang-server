import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtController } from './jwt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  providers: [JwtService],
  controllers: [JwtController],
  exports: [JwtService],
})
export class JwtModule {}

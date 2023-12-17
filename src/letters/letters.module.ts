import { Module } from '@nestjs/common';
import { LettersService } from './letters.service';
import { LettersController } from './letters.controller';
import { LettersRepository } from './letters.repository';

@Module({
  providers: [LettersService, LettersRepository],
  controllers: [LettersController],
})
export class LettersModule {}

import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { LetterRepository } from './letter.repository';

@Module({
  providers: [LetterService, LetterRepository],
  controllers: [LetterController],
})
export class LetterModule {}

import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { LetterRepository } from './letter.repository';
import { MailsModule } from 'src/mails/mails.module';

@Module({
  imports: [MailsModule],
  providers: [LetterService, LetterRepository],
  controllers: [LetterController],
})
export class LetterModule {}

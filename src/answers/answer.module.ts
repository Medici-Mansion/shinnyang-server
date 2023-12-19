import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AnswerRepository } from './answer.repository';

@Module({
  providers: [AnswerService, AnswerRepository],
  controllers: [AnswerController],
})
export class AnswerModule {}

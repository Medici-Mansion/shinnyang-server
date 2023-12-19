import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';

@Controller('answer')
@ApiTags('Answer API')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({
    summary: '답장 생성하기',
    description: '답장을 생성한다',
  })
  @Post()
  async createAnswer(@Body() body) {
    // content, receiverId, senderId?: null 가능,
    //
    this.answerService.createAnswer(body);
  }
}

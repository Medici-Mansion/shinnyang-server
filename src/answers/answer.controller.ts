import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { AnswerDetailDto } from './dtos/answer.response.dto';
import { CreateAnswerDto } from './dtos/answer.request.dto';
import { AccessGuard } from '../auth/guards/acess.guard';
import { AuthUser } from '../auth/decorators/auth-user.decorator';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {
  }

  @ApiOperation({
    summary: '답장 생성하기',
    description: '답장을 생성한다.',
  })
  @ApiCreatedResponse({
    description: '답장 생성 완료',
    schema: {
      $ref: getSchemaPath(AnswerDetailDto),
    },
  })
  @Post()
  async postAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createAnswer(createAnswerDto);
  }

  @ApiOperation({
    summary: '답장 상세 조회',
    description: '받은 답장의 상세 정보를 조회한다',
  })
  @ApiOkResponse({
    description: '답장 상세 조회',
    schema: {
      $ref: getSchemaPath(AnswerDetailDto),
    },
  })
  @Get(':answerId')
  @UseGuards(AccessGuard)
  async getAnswerDetail(
    @AuthUser() { id },
    @Param('answerId', ParseUUIDPipe) answerId: string,
  ) {
    return this.answerService.getAnswerDetail(id, answerId);
  }

  @ApiOperation({
    summary: '답장 리스트 조회',
    description: '받은 답장의 리스트를 조회한다',
  })
  @ApiOkResponse({
    description: '편지 리스트 조회',
    schema: {
      $ref: getSchemaPath(AnswerDetailDto),
    },
  })
  @Get()
  @UseGuards(AccessGuard)
  async getAnswerList(@AuthUser() { id }) {
    return this.answerService.getAnswerList(id);
  }
}

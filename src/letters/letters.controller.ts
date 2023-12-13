import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LettersService } from './letters.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetLettersResponseDto } from './dtos/letters.dto';
import { Response } from 'src/common/interface';
import {
  PostLetterRequestDto,
  PostLetterResponseDto,
} from './dtos/create-letters.dto';

@Controller('letters')
@ApiTags('Letters API')
@ApiExtraModels(GetLettersResponseDto, PostLetterResponseDto)
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}
  @Get()
  @ApiOperation({
    summary: '내가 받은 편지 목록 조회',
    description: '내가 받은 편지 목록을 조회한다',
  })
  @ApiOkResponse({
    description: '내가 받은 편지 목록 조회',
    schema: {
      $ref: getSchemaPath(GetLettersResponseDto),
    },
  })
  async getLetters(): Promise<Response<GetLettersResponseDto[]>> {
    return this.lettersService.getLetters();
  }

  @Post()
  @ApiOperation({
    summary: '편지 생성하기',
    description: '편지를 생성한다',
  })
  @ApiCreatedResponse({
    description: '편지 생성 완료',
    schema: {
      $ref: getSchemaPath(PostLetterResponseDto),
    },
  })
  async postLetters(@Body() postLetterRequestDto: PostLetterRequestDto) {
    return this.lettersService.createLetters(postLetterRequestDto);
  }
}

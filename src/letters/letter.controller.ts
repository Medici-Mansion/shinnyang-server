import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LetterService } from './letter.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetLettersResponseDto } from './dtos/letter.dto';
import { Response } from 'src/common/interface';
import {
  PostLetterRequestDto,
  PostLetterResponseDto,
} from './dtos/create-letter.dto';
import { AccessGuard } from 'src/auth/guards/acess.guard';
import { AuthUser } from '../auth/decorators/auth-user.decorator';

@Controller('letters')
@ApiTags('Letters API')
@ApiExtraModels(GetLettersResponseDto, PostLetterResponseDto)
export class LetterController {
  constructor(private readonly lettersService: LetterService) {}

  @Get()
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
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
  async getLetterList(
    @AuthUser() { id },
  ): Promise<Response<GetLettersResponseDto[]>> {
    return this.lettersService.getLetterList(id);
  }

  @Get(':letterId')
  @ApiOperation({
    summary: '편지 상세 조회',
    description: '편지의 상세 내용을 조회한다',
  })
  @ApiOkResponse({
    description: '편지 상세 조회',
    schema: {
      $ref: getSchemaPath(GetLettersResponseDto),
    },
  })
  async getLetterDetail(
    letterId: number,
  ): Promise<Response<GetLettersResponseDto>> {
    return this.lettersService.getLetterDetail(letterId);
  }

  @Post('letter')
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
  async postLetter(@Body() postLetterRequestDto: PostLetterRequestDto) {
    return this.lettersService.createLetter(postLetterRequestDto);
  }
}

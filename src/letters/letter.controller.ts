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
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LetterDetailDto } from './dtos/letter.response.dto';
import { Response } from 'src/common/interface';
import { CreateLetterDto } from './dtos/letter.request.dto';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { OptinalAccessGuard } from 'src/auth/guards/optinal-access.guard';
import { Payload } from 'src/auth/dtos/jwt.dto';
import { AccessGuard } from 'src/auth/guards/acess.guard';

@Controller('letters')
@ApiTags('Letters API')
@ApiExtraModels(LetterDetailDto, LetterDetailDto)
export class LetterController {
  constructor(private readonly lettersService: LetterService) {}

  @ApiOperation({
    summary: '편지 생성하기',
    description: '편지를 생성한다',
  })
  @ApiCreatedResponse({
    description: '편지 생성 완료',
    schema: {
      $ref: getSchemaPath(LetterDetailDto),
    },
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(OptinalAccessGuard)
  async postLetter(
    @AuthUser() { id }: Partial<Payload>,
    @Body() createLetterDto: CreateLetterDto,
  ) {
    return this.lettersService.createLetter(id, createLetterDto);
  }

  @ApiOperation({
    summary: '편지 보낸사람 업데이트',
    description: '내가보낸 편지의 내 정보가 없을 경우, 업데이트한다',
  })
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @Patch(':letterId')
  async updateSenderIdByLetter(
    @AuthUser() { id }: Payload,
    @Param('letterId') letterId: string,
  ) {
    return await this.lettersService.updateSenderIdByLetter(id, letterId);
  }

  @ApiOperation({
    summary: '편지 상세 조회',
    description: '편지의 상세 내용을 조회한다',
  })
  @ApiOkResponse({
    description: '편지 상세 조회',
    schema: {
      $ref: getSchemaPath(LetterDetailDto),
    },
  })
  @Get(':letterId')
  async getLetterDetail(
    @Param('letterId', ParseUUIDPipe) letterId: string,
  ): Promise<Response<LetterDetailDto>> {
    return this.lettersService.getLetterDetail(letterId);
  }
}

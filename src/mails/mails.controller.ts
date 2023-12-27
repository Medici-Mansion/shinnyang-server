import { AccessGuard } from 'src/auth/guards/acess.guard';
import { MailsService } from './mails.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LetterFromMailResponseDTO } from './dtos/mails.response.dto';
import {
  ReadMailRequestDTO,
  SaveMailRequestDTO,
} from './dtos/mails.request.dto';

@ApiTags('Mails API')
@Controller('mails')
@ApiBearerAuth()
@UseGuards(AccessGuard)
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Get()
  @ApiOkResponse({
    type: [LetterFromMailResponseDTO],
  })
  async getMyMails(@AuthUser() { id }) {
    return await this.mailsService.getMyMails(id);
  }

  @ApiOperation({
    summary: '편지 보관하기',
    description:
      '편지 보관하기 기능 수행 시 호출. 내가 받은 편지(Mail)에 저장된다',
  })
  @Put()
  async saveMails(
    @AuthUser() { id },
    @Body() saveMailRequestDTO: SaveMailRequestDTO,
  ) {
    return await this.mailsService.saveMails(id, saveMailRequestDTO);
  }

  @ApiOperation({
    summary: '메일 읽기',
    description: '우체국에 저장된 메일을 읽음처리 한다',
  })
  @Post('read')
  @ApiCreatedResponse({
    type: Boolean,
  })
  async readMails(
    @AuthUser() { id },
    @Body() readMailRequestDTO: ReadMailRequestDTO,
  ) {
    return await this.mailsService.readMail(id, readMailRequestDTO);
  }
}

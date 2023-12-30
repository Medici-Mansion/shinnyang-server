import { LetterRepository } from './letter.repository';
import { Injectable } from '@nestjs/common';
import { createResponse } from 'src/utils/response.utils';
import { LetterDetailDto } from './dtos/letter.response.dto';
import { Response } from 'src/common/interface';
import { CreateLetterDto, toEntity } from './dtos/letter.request.dto';
import { MailsService } from 'src/mails/mails.service';
import { IsNull } from 'typeorm';

@Injectable()
export class LetterService {
  constructor(
    private readonly lettersRepository: LetterRepository,
    private readonly mailsService: MailsService,
  ) {}

  /**
   * 편지를 생성한다.
   *
   * @issue SNP-39
   * @link https://www.notion.so/raymondanything/SNP-39-26f72c15dd354ee9b870899c3be0bc40?pvs=4
   * @author raymondanything
   * @returns {Promise<Response <LetterDetailDto>>} PostLetterResponseDto
   * @param userId
   * @param createLetterDto
   */
  async createLetter(
    userId: string,
    createLetterDto: CreateLetterDto,
  ): Promise<Response<LetterDetailDto>> {
    const letter = toEntity(userId, createLetterDto);
    const newLetter = await this.lettersRepository.createLetter(letter);

    if (createLetterDto.receiverId) {
      await this.mailsService.saveMails(createLetterDto.receiverId, {
        letterId: newLetter.id,
      });
    }

    if (createLetterDto.replyMailId) {
      // 편지를 보내는사람이 회원 / 비회원
      // 편지를 받는 사람이 회원 / 비회원
      // 메일을 보유한 -> 메일함을 통해 답장한 경우
      // 메일을 보유하지 않은 -> 메일함 없이 답장(링크공유) 또는 편지쓰기 한 경우
      await this.mailsService.updateReplyMail({
        mailId: createLetterDto.replyMailId,
        replyLetterId: newLetter.id,
      });
    }
    return createResponse(new LetterDetailDto(newLetter));
  }

  async getLetterDetail(letterId: string): Promise<Response<LetterDetailDto>> {
    const findLetter = await this.lettersRepository.getLetter(letterId);
    return createResponse(new LetterDetailDto(findLetter));
  }

  async updateSenderIdByLetter(userId: string, letterId: string) {
    const targetLetter = await this.lettersRepository.findOne({
      where: {
        senderId: IsNull(),
        id: letterId,
      },
    });

    if (targetLetter) {
      targetLetter.senderId = userId;
      await this.lettersRepository.save(targetLetter);
      return true;
    }
    return false;
  }
}

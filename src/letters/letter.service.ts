import { LetterRepository } from './letter.repository';
import { Injectable } from '@nestjs/common';
import { createResponse } from 'src/utils/response.utils';
import { GetLettersResponseDto } from './dtos/letter.dto';
import { Response } from 'src/common/interface';
import {
  PostLetterRequestDto,
  PostLetterResponseDto,
} from './dtos/create-letter.dto';

@Injectable()
export class LetterService {
  constructor(private readonly lettersRepository: LetterRepository) {}

  /**
   * 편지를 조회한다.
   *
   * @issue SNP-39
   * @link https://www.notion.so/raymondanything/SNP-39-26f72c15dd354ee9b870899c3be0bc40?pvs=4
   * @author raymondanything
   * @returns {Promise<Response <GetLettersResponseDto[]>>} GetLettersResponseDto[]
   */
  async getLetterList(id: number): Promise<Response<GetLettersResponseDto[]>> {
    const letterList = await this.lettersRepository.find({
      where: { receiverId: id },
      order: { createdAt: 'asc' },
    });
    return createResponse(
      letterList.map((letter) => new GetLettersResponseDto(letter)),
    );
  }

  async getLetterDetail(
    letterId: number,
  ): Promise<Response<GetLettersResponseDto>> {
    const letter = await this.lettersRepository.findOne({
      where: { id: letterId },
    });
    return createResponse(new GetLettersResponseDto(letter));
  }

  /**
   * 편지를 생성한다.
   *
   * @issue SNP-39
   * @link https://www.notion.so/raymondanything/SNP-39-26f72c15dd354ee9b870899c3be0bc40?pvs=4
   * @author raymondanything
   * @param postLetterRequestDto
   * @returns {Promise<Response <PostLetterResponseDto>>} PostLetterResponseDto
   */
  async createLetter(
    postLetterRequestDto: PostLetterRequestDto,
  ): Promise<Response<PostLetterResponseDto>> {
    const newLetter =
      await this.lettersRepository.createLetter(postLetterRequestDto);
    return createResponse(new PostLetterResponseDto(newLetter.id));
  }

  createAnswer(postLetterRequestDto: PostLetterRequestDto) {
    return Promise.resolve(undefined);
  }
}

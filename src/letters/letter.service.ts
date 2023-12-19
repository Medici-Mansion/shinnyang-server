import { LetterRepository } from './letter.repository';
import { Injectable } from '@nestjs/common';
import { createResponse } from 'src/utils/response.utils';
import { GetLettersResponseDto } from './dtos/letter.response.dto';
import { Response } from 'src/common/interface';
import {
  PostLetterRequestDto,
  PostLetterResponseDto,
  toEntity,
} from './dtos/letter.request.dto';

@Injectable()
export class LetterService {
  constructor(private readonly lettersRepository: LetterRepository) {
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
    const letter = toEntity(postLetterRequestDto);
    const newLetter = await this.lettersRepository.createLetter(letter);
    return createResponse(new PostLetterResponseDto(newLetter['id']));
  }

  async getLetterDetail(
    letterId: string,
  ): Promise<Response<GetLettersResponseDto>> {
    const letter = await this.lettersRepository.findOne({
      where: { id: letterId },
    });
    return createResponse(new GetLettersResponseDto(letter));
  }
}

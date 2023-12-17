import { LettersRepository } from './letters.repository';
import { Injectable } from '@nestjs/common';
import { createResponse } from 'src/utils/response.utils';
import { GetLettersResponseDto } from './dtos/letters.dto';
import { Response } from 'src/common/interface';
import {
  PostLetterRequestDto,
  PostLetterResponseDto,
} from './dtos/create-letters.dto';

@Injectable()
export class LettersService {
  constructor(private readonly lettersRepository: LettersRepository) {}

  /**
   * 편지를 조회한다.
   *
   * @issue SNP-39
   * @link https://www.notion.so/raymondanything/SNP-39-26f72c15dd354ee9b870899c3be0bc40?pvs=4
   * @author raymondanything
   * @returns {Promise<Response <GetLettersResponseDto[]>>} GetLettersResponseDto[]
   */
  async getLetters(): Promise<Response<GetLettersResponseDto[]>> {
    const lettersResult = await this.lettersRepository.find();
    return createResponse(
      lettersResult.map((letters) => new GetLettersResponseDto(letters)),
    );
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
}

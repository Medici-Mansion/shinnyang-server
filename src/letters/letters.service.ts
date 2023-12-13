import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Letters } from './entities/letters.entity';
import { createResponse } from 'src/utils/response.utils';
import { GetLettersResponseDto } from './dtos/letters.dto';
import { Response } from 'src/common/interface';
import {
  PostLetterRequestDto,
  PostLetterResponseDto,
} from './dtos/create-letters.dto';

@Injectable()
export class LettersService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async getLetters(): Promise<Response<GetLettersResponseDto[]>> {
    const lettersResult = await this.connection
      .createQueryBuilder(Letters, 'letters')
      .getMany();
    return createResponse(
      lettersResult.map((letters) => new GetLettersResponseDto(letters)),
    );
  }

  async createLetters(postLetterRequestDto: PostLetterRequestDto) {
    const { content, receiverId, senderId, senderNickname } =
      postLetterRequestDto;
    const result = await this.connection
      .createQueryBuilder(Letters, 'letters')
      .insert()
      .into<Letters>('letters')
      .values([
        {
          content,
          receiverId,
          senderId,
          senderNickname,
        },
      ])
      .returning('id')
      .execute();

    return createResponse(
      new PostLetterResponseDto(result.generatedMaps[0].id),
    );
  }
}

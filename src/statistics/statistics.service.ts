import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateKakaoShareStatisticRequestDto } from './dto/create-statistic.dto';
import { KakaoShareCallbackStatistic } from './entities/statistic.entity';

@Injectable()
export class StatisticsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async create(
    createKakaoShareStatisticRequestDto: CreateKakaoShareStatisticRequestDto,
  ) {
    const repository = this.dataSource.getRepository(
      KakaoShareCallbackStatistic,
    );

    await repository.save(
      repository.create({
        chatType: createKakaoShareStatisticRequestDto.CHAT_TYPE,
        hashChatId: createKakaoShareStatisticRequestDto.HASH_CHAT_ID,
        templateId: createKakaoShareStatisticRequestDto.TEMPLATE_ID,
        letterId: createKakaoShareStatisticRequestDto.letterId,
        letterType: createKakaoShareStatisticRequestDto.letterType,
      }),
    );
    return null;
  }
}

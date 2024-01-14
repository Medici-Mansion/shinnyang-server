import { Controller, Post, Body } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateKakaoShareStatisticRequestDto } from './dto/create-statistic.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('statistics')
@ApiTags('Statistics API')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post('share/kakao')
  create(@Body() createStatisticDto: CreateKakaoShareStatisticRequestDto) {
    return this.statisticsService.create(createStatisticDto);
  }
}

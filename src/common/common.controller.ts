import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatDTO } from './dto/cat.dto';

@ApiTags('Common API')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({
    description: '냥이 정보 조회',
    summary: '이미지를 보유한 냥이정보를 조회한다.',
  })
  @ApiOkResponse({
    description: '냥이 정보 조회 성공',
    type: [CatDTO],
  })
  @Get('cats')
  async getCatsData() {
    return await this.commonService.findAllCats();
  }
}

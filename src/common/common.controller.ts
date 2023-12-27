import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommonService } from './common.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CatDTO } from './dto/cat.dto';
import { AccessoryDTO } from './dto/accessory.dto';
import { UserCatDto } from './dto/user-cat.dto';
import { AccessGuard } from '../auth/guards/acess.guard';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Payload } from '../auth/dtos/jwt.dto';
import { UserCatPatchDto } from './dto/user-cat-patch.dto';

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

  @ApiOperation({
    description: '악세사리 정보 조회',
    summary: '이미지를 보유한 악세사리정보를 조회한다.',
  })
  @ApiOkResponse({
    description: '악세사리 정보 조회 성공',
    type: [AccessoryDTO],
  })
  @Get('accessories')
  async getAccessoryData() {
    return await this.commonService.findAllAccessories();
  }

  @ApiOperation({
    description: '유저의 냥이 정보 조회',
    summary: '유저의 냥이 정보를 조회한다.',
  })
  @ApiOkResponse({
    description: '유저냥이 정보 조회 성공',
    type: [UserCatDto],
  })
  @ApiBearerAuth()
  @Get('user-cat')
  @UseGuards(AccessGuard)
  async getUserCatData(@AuthUser() { id }: Payload) {
    return await this.commonService.findUserCats(id);
  }

  @ApiOperation({
    description: '유저냥이 악세사리 변경',
    summary: '유저의 냥이 악세사리를 변경한다.',
  })
  @ApiOkResponse({
    description: '유저냥이 악세사리 변경 성공',
    type: [UserCatDto],
  })
  @ApiBearerAuth()
  @Patch('accessory')
  @UseGuards(AccessGuard)
  async updateUserCatAccessory(
    @AuthUser() { id }: Payload,
    @Body() userCatPatchDto: UserCatPatchDto,
  ) {
    return await this.commonService.updateUserCatAccessory(id, userCatPatchDto);
  }
}

import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard } from 'src/auth/guards/acess.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Payload } from 'src/auth/dtos/jwt.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserResponse } from './dtos/user.dto';
import { ChangeNicknameDTO } from './dtos/set-nickname.dto';

@Controller('user')
@ApiBearerAuth()
@ApiExtraModels(UserResponse)
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '내정보 조회',
    description: '나의 계정정보를 조회한다.',
  })
  @ApiOkResponse({
    description: '나의 정보',
    schema: {
      $ref: getSchemaPath(UserResponse),
    },
  })
  @UseGuards(AccessGuard)
  @Get('me')
  async getMe(@AuthUser() { id }: Payload) {
    return await this.userService.getMe(id);
  }

  @ApiOperation({
    summary: '회원탈퇴',
    description: '나의 계정정보를 삭제한다.',
  })
  @ApiOkResponse()
  @UseGuards(AccessGuard)
  @Delete()
  async deleteMe(@AuthUser() { id }: Payload) {
    return await this.userService.deleteMe(id);
  }

  @ApiOperation({
    summary: '닉네임 변경',
    description: '나의 닉네임을 설정/변경한다.',
  })
  @ApiOkResponse({
    description: '성공 여부',
    type: Boolean,
  })
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @Post('nickname')
  async changeNickname(
    @AuthUser() { id }: Payload,
    @Body() changeNicknameDTO: ChangeNicknameDTO,
  ) {
    return await this.userService.changeNickname(id, changeNicknameDTO);
  }
}

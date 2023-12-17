import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard } from 'src/auth/guards/acess.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Payload } from 'src/auth/dtos/jwt.dto';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserResponse } from './dtos/user.dto';

@Controller('user')
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
}

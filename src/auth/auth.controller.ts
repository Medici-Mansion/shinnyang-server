import { Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('kakao auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({})
  @ApiOkResponse({})
  async createAccessToken() {
    return this.authService.createToken();
  }
}

// 컨트롤러 -> 서비스 -> 레포
// 엔드포인트 비즈니스로직 db접근

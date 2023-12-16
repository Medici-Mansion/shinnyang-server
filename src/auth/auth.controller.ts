import { Body, Controller, Get, Header, Post, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as process from 'process';

@Controller('auth')
@ApiTags('kakao auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res: Response): Promise<void> {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.REDIRECT_URL}`;
    res.redirect(url);
  }

  @Get('kakao')
  async getKakaoInfo(@Query() query: { code }) {
    const apikey = process.env.KAKAO_API_KEY;
    const redirectUri = process.env.REDIRECT_URL;
    await this.authService.kakaoLogin(apikey, redirectUri, query.code);
  }

  @Post()
  @ApiOperation({})
  @ApiOkResponse({})
  async createAccessToken() {
    return this.authService.createToken();
  }
}

// 컨트롤러 -> 서비스 -> 레포
// 엔드포인트 비즈니스로직 db접근

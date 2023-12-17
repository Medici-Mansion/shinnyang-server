import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  PostAccessTokenRequestDto,
  PostAccessTokenResponseDto,
} from './dtos/create-auth.dtos';

@Controller('auth')
@ApiTags('kakao auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/access-token') // code 받아오는 엔드포인트 4%2F0AfJohXmn0sJKMg_ma1VbI4CfrUO176trAKku1GPVoZ-Wu4EsWG7gGDjHrm-H3qlsPMgxrA
  // @Header('Content-Type', 'text/html')
  async googleRedirect(@Res() res: Response): Promise<void> {
    const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${process.env.GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline`;
    // const urlTest = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline`;
    // 위 urlTest는 url과 동작이 같음

    res.redirect(url);
  }
}

// 컨트롤러 -> 서비스 -> 레포
// 엔드포인트 비즈니스로직 db접근

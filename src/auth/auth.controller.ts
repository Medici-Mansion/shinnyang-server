import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Res,
} from '@nestjs/common';
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

  @Get('/login')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res: Response): Promise<void> {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_APIKEY}&redirect_uri=${process.env.REDIRECT_URL}`;
    res.redirect(url);
  }

  @Get('/kakao')
  async getKakaoInfo(
    @Query() postAccessTokenRequestDto: PostAccessTokenRequestDto,
  ): Promise<PostAccessTokenResponseDto> {
    return this.authService.kakaoLogin(postAccessTokenRequestDto);
  }
}

// 컨트롤러 -> 서비스 -> 레포
// 엔드포인트 비즈니스로직 db접근

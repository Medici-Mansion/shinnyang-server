import { Controller, Get, Query, Res } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { Response } from 'express';
import { URL } from 'url';
import { ApiTags } from '@nestjs/swagger';

@Controller('oauth')
@ApiTags('Oauth API')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google/auth')
  getGoogleAuth(@Res() res: Response): void {
    const url = new URL(
      'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount',
    );
    url.searchParams.set('client_id', process.env.GOOGLE_AUTH_CLIENT_ID);
    url.searchParams.set('redirect_uri', process.env.GOOGLE_REDIRECT_URL);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set(
      'scope',
      'https://www.googleapis.com/auth/userinfo.email',
    );
    url.searchParams.set('access_type', 'offline');
    return res.redirect(url.toString());
  }

  @Get('google/user')
  async getUserFromGoogle(@Query('code') code: string) {
    const user = await this.oauthService.userFromGoogle(code);
    return user;
  }
}

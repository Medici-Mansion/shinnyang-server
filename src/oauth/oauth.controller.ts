import { Controller, Get, Query, Res } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { Response } from 'express';
import { URL } from 'url';

@Controller('oauth')
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
    console.log(
      process.env.GOOGLE_REDIRECT_URL,
      '<<process.env.GOOGLE_REDIRECT_URL',
    );
    return res.redirect(url.toString());
  }

  @Get('google/user')
  getUserFromGoogle(@Query('code') code: string) {
    return this.oauthService.userFromGoogle(code);
  }
}

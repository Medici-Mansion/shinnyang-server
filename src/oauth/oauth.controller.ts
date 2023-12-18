import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { Response } from 'express';
import { URL } from 'url';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GoogleAuthResponse } from './dtos/google.dto';
import { UserResponse } from 'src/users/dtos/user.dto';
import { JWT } from 'src/auth/dtos/jwt.dto';
import { ServiceProvider } from './dtos/service-provider.dto';
import { ParseExplicitEnumPipe } from 'src/common/pipes/eum.pipe';

@Controller('oauth')
@ApiExtraModels(GoogleAuthResponse, UserResponse, JWT)
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

  @ApiOkResponse({
    description: '구글 로그인 및 토큰 정보',
    schema: {
      $ref: getSchemaPath(GoogleAuthResponse),
    },
  })
  @Get(':serviceName/user')
  async getUserFromServiceProvider(
    @Param('serviceName', new ParseExplicitEnumPipe(ServiceProvider))
    service: string,
    @Query('code') code: string,
  ) {
    // const user = await this.oauthService.userFromGoogle(code);
    // return user;
    console.log(service, '<<service');
    return true;
  }
}

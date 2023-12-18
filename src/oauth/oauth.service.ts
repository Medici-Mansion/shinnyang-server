import { AuthService } from './../auth/auth.service';
import { UserService } from './../users/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleAuthResponse, GoogleUserInfo } from './dtos/google.dto';
import { URL } from 'url';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ServiceProvider } from './dtos/service-provider.dto';

@Injectable()
export class OauthService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  getServiceRedirectUrl(service: ServiceProvider) {
    switch (service) {
      case ServiceProvider.GOOGLE:
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
        return url;
      default:
        break;
    }
    throw new BadRequestException();
  }

  async userFromGoogle(code: string) {
    const form = new FormData();
    form.append('client_id', process.env.GOOGLE_AUTH_CLIENT_ID);
    form.append('client_secret', process.env.GOOGLE_AUTH_CLIENT_SECRET);
    form.append('code', code);
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', process.env.GOOGLE_REDIRECT_URL);
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      form,
    );
    if (!response.data['access_token']) {
      throw new BadRequestException('Access-Token을 받아오지 못 했습니다.');
    }
    // 회원정보 가져오기
    const userUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const userResponse = await axios.get(userUrl, {
      params: {
        access_token: response.data['access_token'],
      },
    });

    const googleUesr = userResponse.data as GoogleUserInfo;

    let user = await this.userService.findByUserEmail(googleUesr.email);
    if (!user) {
      user = await this.userService.create({ email: googleUesr.email });
    }
    const token = this.authService.sign(user.id);
    user.refresh = token.refresh;
    await this.dataSource.getRepository(User).save(user);
    return new GoogleAuthResponse(token, user);
  }
}

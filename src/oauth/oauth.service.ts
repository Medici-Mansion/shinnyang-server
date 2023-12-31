import { AuthService } from './../auth/auth.service';
import { UserService } from './../users/user.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GoogleUserInfo } from './dtos/google.dto';
import { URL } from 'url';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ServiceProvider } from './dtos/service-provider.dto';
import { JWT } from 'src/auth/dtos/jwt.dto';

@Injectable()
export class OauthService {
  private readonly logger = new Logger(OauthService.name);
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
      case ServiceProvider.KAKAO:
        const kakaoURL = new URL('https://kauth.kakao.com/oauth/authorize');
        kakaoURL.searchParams.set('client_id', process.env.KAKAO_CLIENT_ID);
        kakaoURL.searchParams.set('response_type', 'code');
        kakaoURL.searchParams.set(
          'redirect_uri',
          process.env.KAKAO_REDIRECT_URL,
        );
        return kakaoURL;
      default:
        break;
    }
    throw new BadRequestException();
  }

  async userFromGoogle(code: string): Promise<JWT> {
    try {
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
      return new JWT(token);
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException('invalid request: ' + err?.message || '');
    }
  }
  async userFromKakao(code: string): Promise<JWT> {
    try {
      const form = new FormData();
      form.append('client_id', process.env.KAKAO_CLIENT_ID);
      form.append('redirect_uri', process.env.KAKAO_REDIRECT_URL);
      form.append('grant_type', 'authorization_code');
      form.append('code', code);
      const response = await axios.post<{
        access_token: string;
        token_type: string;
        refresh_token: string;
        expires_in: number;
        scope: string;
        refresh_token_expires_in: number;
      }>('https://kauth.kakao.com/oauth/token	', form, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      if (!response.data['access_token']) {
        throw new BadRequestException('Access-Token을 받아오지 못 했습니다.');
      }
      // 회원정보 가져오기
      const userUrl = 'https://kapi.kakao.com/v2/user/me';
      const userResponse = await axios.get(userUrl, {
        params: {
          access_token: response.data['access_token'],
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      // const googleUesr = userResponse.data as GoogleUserInfo;
      return userResponse.data;
      // let user = await this.userService.findByUserEmail(googleUesr.email);
      // if (!user) {
      //   user = await this.userService.create({ email: googleUesr.email });
      // }
      // const token = this.authService.sign(user.id);
      // user.refresh = token.refresh;
      // await this.dataSource.getRepository(User).save(user);
      // return new JWT(token);
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException('invalid request: ' + err?.message || '');
    }
  }
}

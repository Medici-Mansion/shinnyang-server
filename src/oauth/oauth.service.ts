import { UserService } from './../users/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleUserInfo } from './dtos/google.dto';

@Injectable()
export class OauthService {
  constructor(private readonly userService: UserService) {}
  async userFromGoogle(code: string) {
    const form = new FormData();
    form.append('client_id', process.env.GOOGLE_AUTH_CLIENT_ID);
    form.append('client_secret', process.env.GOOGLE_AUTH_CLIENT_SECRET);
    form.append('code', code);
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', process.env.GOOGLE_REDIRECT_URL);
    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        form,
      );
      if (!response.data['access_token']) {
        return new BadRequestException('Access-Token을 받아오지 못 했습니다.');
      }
      // 회원정보 가져오기
      const userUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
      const userResponse = await axios.get(userUrl, {
        params: {
          access_token: response.data['access_token'],
        },
      });

      const googleUesr = userResponse.data as GoogleUserInfo;

      const user = await this.userService.findByUserEmail(googleUesr.email);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

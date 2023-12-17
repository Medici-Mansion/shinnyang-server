import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly userService: UserService,
    private readonly http: HttpService) {
  }

  async kakaoLogin(apikey: string, redirectUri: string, code: string) {
    const config = {
      grant_type: 'authorization_code',
      client_id: apikey,
      redirect_uri: redirectUri,
      code,
    };

    // kakao API를 통해 token 얻기
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://kauth.kakao.com/oauth/token?${params}`;
    const res = await firstValueFrom(
      this.http.post(tokenUrl, '', { headers: tokenHeaders }),
    );
    console.log("res = ", res)

    // Kakao API를 통해 유저 정보 얻기
    const userInfoUrl = `https://kapi.kakao.com/v2/user/me`;
    const userInfoHeaders = {
      Authorization: `Bearer ${res.data.access_token}`,
    };
    const { data } = await firstValueFrom(
      this.http.get(userInfoUrl, { headers: userInfoHeaders }),
    );
    console.log("data = ", data)

    // 유저 데이터베이스에 저장
    const nickname = data.kakao_account.profile.nickname;
    const email = data.kakao_account.email;
    const user = await this.userService.createUser(email, nickname)

    const accessToken = res.data.access_token;
    const refreshToken = res.data.refresh_token;
    // redis에 토큰 저장 로직 필요
  }

  async createToken() {
    return await this.authRepo.createtoken();
    // 비즈니스 로직
  }
}

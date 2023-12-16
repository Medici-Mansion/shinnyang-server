import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly http: HttpService) {
  }

  async kakaoLogin(apikey: string, redirectUri: string, code: string) {
    const config = {
      grant_type: 'authorization_code',
      client_id: apikey,
      redirect_uri: redirectUri,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://kauth.kakao.com/oauth/token?${params}`;
    const res = await firstValueFrom(
      this.http.post(tokenUrl, '', { headers: tokenHeaders }),
    );
  }

  async createToken() {
    return await this.authRepo.createtoken();
    // 비즈니스 로직
  }
}

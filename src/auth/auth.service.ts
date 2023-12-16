import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import {
  PostAccessTokenRequestDto,
  PostAccessTokenResponseDto,
} from './dtos/create-auth.dtos';

import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly http: HttpService,
  ) {}

  // async gettoken(
  //   postAccessTokenRequestDto: PostAccessTokenRequestDto,
  // ): Promise<PostAccessTokenResponseDto> {
  //   const accessToken = axios.post(
  //     `https://kauth.kakao.com/oauth/token`,
  //     {
  //       grant_type: 'authorization_code',
  //       client_id: '835ecc8c24480280c0a8164b9e366263',
  //       code: postAccessTokenRequestDto.code,
  //       redirect_uri: 'https://www.catsnewyear.site/',
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     },
  //   );
  //   // redis 넣어주고
  //   //
  //   console.log(accessToken);
  //   return;
  // }

  async kakaoLogin(
    postAccessTokenRequestDto: PostAccessTokenRequestDto,
  ): Promise<PostAccessTokenResponseDto> {
    const { code } = postAccessTokenRequestDto;
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_APIKEY,
        code,
        redirect_uri: process.env.REDIRECT_URL,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    // redis 넣어주고
    //
    console.log('data : ', data);
    return data;
  }
}

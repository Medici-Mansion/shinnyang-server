import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import {
  PostAccessTokenRequestDto,
  PostAccessTokenResponseDto,
} from './dtos/create-auth.dtos';

import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { Payload } from './interface/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly http: HttpService,
  ) {}

  async getGoogleAccessToken(
    postAccessTokenRequestDto: PostAccessTokenRequestDto,
  ): Promise<PostAccessTokenResponseDto> {
    const { code } = postAccessTokenRequestDto;
    const { data } = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        fdfd: 'fdfd',
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

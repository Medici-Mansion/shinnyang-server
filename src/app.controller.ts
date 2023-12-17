import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpException,
  Logger,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { UserService } from './users/user.service';
import { PostUserRequestDto } from './users/dtos/create-users.dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck() {
    return true;
  }

  @Get('login') // access-tokem을 가져오고 회원 insert?
  async login(@Query('code') code: string, @Query('scope') scope: string) {
    // DTO로 바꿔야함
    const form = new FormData();
    form.append('client_id', process.env.GOOGLE_AUTH_CLIENT_ID);
    form.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
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
      const user = await axios.get(userUrl, {
        params: {
          access_token: response.data['access_token'],
        },
      });
      const email = user?.data?.email;
      if (!email) return new NotFoundException('email을 받아오지 못 했습니다.');

      console.log('1');
      const foundEmail = await this.userService.findByUserEmail(email);
      if (foundEmail) {
        return new ConflictException('중복되는 email이 있습니다.');
      }
      console.log('2');

      //insert user
      this.userService.createUser(email); // PostUserRequestDto

      return 'ok';
    } catch (err) {
      Logger.error(err);
    }
    return false;
  }
}

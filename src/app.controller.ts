import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
      // console.log('access_token =', response.data);
      if (response.data['access_token']) {
        const userUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

        const user = await axios.get(userUrl, {
          params: {
            access_token: response.data['access_token'],
          },
        });
        // console.log('user-datas = ',user.data);
        return user.data;
      }
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return false;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  async getKakaoInfo(@Query() code: string) {
    console.log("code=", code);
  }

  @Get('health')
  healthCheck() {
    return true;
  }
}

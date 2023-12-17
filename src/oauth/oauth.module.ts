import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}

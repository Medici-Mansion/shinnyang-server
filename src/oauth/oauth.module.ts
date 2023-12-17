import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { OauthModule } from './oauth/oauth.module';
import * as joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: joi.object({
        GOOGLE_API_KEY: joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: joi.string().required(),
        GOOGLE_REDIRECT_URL: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PWD: joi.string().required(),
        DB_NAME: joi.string().required(),
        PORT: joi.string().required(),
      }),
    }),
    // 아직 어떤 db를 쓸지 정하지 않았음
    DatabaseModule,
    UserModule,
    AuthModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

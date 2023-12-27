import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { OauthModule } from './oauth/oauth.module';
import { CommonModule } from './common/common.module';
import Joi from '@hapi/joi';
import { LetterModule } from './letters/letter.module';
import { AppController } from './app.controller';
import { AnswerModule } from './answers/answer.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MailsModule } from './mails/mails.module';
@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        GOOGLE_API_KEY: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_REDIRECT_URL: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PWD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    OauthModule,
    CommonModule,
    LetterModule,
    AnswerModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

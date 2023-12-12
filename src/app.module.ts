import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    // 아직 어떤 db를 쓸지 정하지 않았음
    // TypeOrmModule.forRoot({
    //   type: '',
    //   host: '',
    //   port: ,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   autoLoadEntities: ,
    //   keepConnectionAlive: ,
    //   migrations: ,
    //   charset: '',
    //   synchronize: false,
    //   logging: true,
    // }),
    // TypeOrmModule.forFeature([
    //   // 사용할 모듈들 입력
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

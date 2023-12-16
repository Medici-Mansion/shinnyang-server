import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';
import { IORedisKey } from './redis.constants';
import { Redis } from 'ioredis';
import { ModuleRef } from '@nestjs/core';
import * as IORedis from 'ioredis';

// 로컬용 모듈
@Module({
  providers: [
    {
      provide: 'RedisConnection',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST, // 여기에 Redis 컨테이너의 호스트를 입력하세요
          port: +process.env.REDIS_PORT, // 여기에 Redis 컨테이너의 포트를 입력하세요
          // 추가적으로 필요한 설정 (예: 비밀번호)이 있다면 여기에 추가하세요
          password: process.env.REDIS_PASSWORD,
        });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
// @Global()
// @Module({
//   imports: [ConfigModule],
//   providers: [
//     {
//       provide: IORedisKey,
//       useFactory: async (configService: ConfigService) => {
//         return new Redis({
//           host: process.env.REDIS_HOST,
//           port: 9999, //parseInt(configService.get('REDIS_PORT'), 10) || 9999, // 환경 변수에서 포트 가져오기
//           password: process.env.REDIS_PASSWORD, //configService.get('REDIS_PASSWORD'), // 필요시 비밀번호 설정
//           connectTimeout: 1000,
//         });
//       },
//       inject: [ConfigService],
//     },
//     RedisService,
//   ],
//   exports: [RedisService],
//   // imports: [ConfigModule],
//   // providers: [
//   //   {
//   //     provide: IORedisKey,
//   //     useFactory: async (consfigService: ConfigService) => {
//   //       return new Redis(consfigService.get('redis'));
//   //     },
//   //     inject: [ConfigService],
//   //   },
//   //   RedisService,
//   // ],
//   // exports: [RedisService],
// })
// // onApplicationShutdown은 애플리케이션이 종료될 때 실행될 함수를 정의함. 여기서는 Redis 연결을 종료하는 로직을 작성했음
// // 레디스를 종료하지 않아도 되는지 논의 필요
// export class RedisModule implements OnApplicationShutdown {
//   constructor(private readonly moduleRef: ModuleRef) {}
//   // ModuleRef를 사용하여 애플리케이션 종료 시 Redis 연결을 정리하는 로직을 구현한 코드

//   async onApplicationShutdown(signal?: string): Promise<void> {
//     return new Promise<void>((resolve) => {
//       const redis = this.moduleRef.get(IORedisKey);
//       redis.quit();
//       redis.on('end', () => {
//         resolve();
//       });
//     });
//   }
// }

import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';
import { IORedisKey } from './redis.constants';
import { Redis } from 'ioredis';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IORedisKey,
      useFactory: async (consfigService: ConfigService) => {
        return new Redis(consfigService.get('redis'));
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
// onApplicationShutdown은 애플리케이션이 종료될 때 실행될 함수를 정의함. 여기서는 Redis 연결을 종료하는 로직을 작성했음
// 레디스를 종료하지 않아도 되는지 논의 필요
export class RedisModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}
  // ModuleRef를 사용하여 애플리케이션 종료 시 Redis 연결을 정리하는 로직을 구현한 코드

  async onApplicationShutdown(signal?: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const redis = this.moduleRef.get(IORedisKey);
      redis.quit();
      redis.on('end', () => {
        resolve();
      });
    });
  }
}

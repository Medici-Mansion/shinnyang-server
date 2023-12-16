// import { Inject, Injectable } from '@nestjs/common';
// import { IORedisKey } from './redis.constants';
// import { privateDecrypt } from 'crypto';
// import { Redis } from 'ioredis';

// @Injectable()
// export class RedisService {
//   constructor(
//     @Inject(IORedisKey) private readonly redisClient: Redis,
//     //private readonly redisClient: Redis,
//   ) {}

//   // 각각의 함수들에 DTO들을 추가 할지 논의 필요

//   async insert(key: string, value: string | number): Promise<void> {
//     await this.redisClient.set(key, value);
//   }

//   async get(key: string): Promise<string> {
//     return this.redisClient.get(key);
//   }
// }
// redis.service.ts

// 로컬용 service
import { Injectable, Inject } from '@nestjs/common';
import * as IORedis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('RedisConnection') private readonly redis: IORedis.Redis,
  ) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
}

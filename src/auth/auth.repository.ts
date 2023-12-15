import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}
  // 상의 필요

  async createtoken() {
    return '1234';
  }
}

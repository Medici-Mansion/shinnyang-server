import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(@InjectDataSource() dataSource: DataSource) {}

  async createAnswer(answer) {
    return 0; // return this.save(answer);
  }
}

import { DataSource, Repository } from 'typeorm';
import { Answer } from '../letters/entities/answer.entity';
import { InjectDataSource } from '@nestjs/typeorm';

export class AnswerRepository extends Repository<Answer> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Answer, dataSource.createEntityManager());
  }

  async createAnswer(answer: Answer) {
    return this.save(answer);
  }

  async getAnswer(answerId: string) {
    return this.findOne({
      where: { id: answerId },
    });
  }

  async getAnswerList(id: string) {
    return this.createQueryBuilder('answer')
      .where('answer.receiverId = :id', { id })
      .orderBy('answer.createdAt', 'ASC')
      .limit(27)
      .getMany();
  }
}

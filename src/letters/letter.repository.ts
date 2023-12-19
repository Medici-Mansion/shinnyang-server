import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Letter } from '../entities/letter.entity';

export class LetterRepository extends Repository<Letter> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Letter, dataSource.createEntityManager());
  }

  async createLetter(letter: Letter) {
    return this.save(letter);
  }
}

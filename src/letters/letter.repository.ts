import { DataSource, Repository } from 'typeorm';
import { Letter } from './entities/letter.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { PostLetterRequestDto } from './dtos/create-letter.dto';

export class LetterRepository extends Repository<Letter> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Letter, dataSource.createEntityManager());
  }

  async createLetter(postLetterRequestDto: PostLetterRequestDto) {
    return this.save(this.create(postLetterRequestDto));
  }
}

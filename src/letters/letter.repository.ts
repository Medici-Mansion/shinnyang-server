import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PostLetterRequestDto } from './dtos/create-letter.dto';
import { Letters } from './entities/letters.entity';

export class LetterRepository extends Repository<Letters> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Letters, dataSource.createEntityManager());
  }

  async createLetter(postLetterRequestDto: PostLetterRequestDto) {
    return this.save(this.create(postLetterRequestDto));
  }
}

import { DataSource, Repository } from 'typeorm';
import { Letters } from './entities/letters.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { PostLetterRequestDto } from './dtos/create-letters.dto';

export class LettersRepository extends Repository<Letters> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Letters, dataSource.createEntityManager());
  }

  async createLetter(postLetterRequestDto: PostLetterRequestDto) {
    return this.save(this.create(postLetterRequestDto));
  }
}

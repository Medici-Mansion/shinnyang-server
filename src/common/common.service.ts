import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, IsNull, Not } from 'typeorm';
import { Cats } from './entities/cats.entity';
import { CatDTO } from './dto/cat.dto';

@Injectable()
export class CommonService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findAllCats() {
    const cats = await this.dataSource.getRepository(Cats).find({
      where: {
        image: Not(IsNull()),
      },
    });
    return cats.map((cat) => new CatDTO(cat));
  }
}

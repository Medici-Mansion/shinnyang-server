import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, IsNull, Not } from 'typeorm';
import { Cats } from './entities/cats.entity';
import { CatDTO } from './dto/cat.dto';
import { Accessories } from './entities/accessories.entity';
import { AccessoryDTO } from './dto/accessory.dto';

@Injectable()
export class CommonService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findAllCats() {
    const cats = await this.dataSource.getRepository(Cats).find({
      where: {
        image: Not(IsNull()),
      },
      order: {
        createdAt: 'ASC',
      },
    });
    return cats.map((cat) => new CatDTO(cat));
  }

  async findAllAccessories() {
    const accessories = await this.dataSource.getRepository(Accessories).find({
      where: {
        fullImage: Not(IsNull()),
      },
      order: {
        createdAt: 'ASC',
      },
    });
    return accessories.map((accessory) => new AccessoryDTO(accessory));
  }
}

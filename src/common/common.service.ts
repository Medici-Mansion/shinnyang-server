import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, IsNull, Not } from 'typeorm';
import { Cats } from './entities/cats.entity';
import { CatDTO } from './dto/cat.dto';
import { Accessories } from './entities/accessories.entity';
import { AccessoryDTO } from './dto/accessory.dto';
import { UserCatEntity } from './entities/user-cat.entity';
import { UserCatDto } from './dto/user-cat.dto';
import { UserCatPatchDto } from './dto/user-cat-patch.dto';

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

  async findUserCats(id: string): Promise<UserCatDto[]> {
    const userCats = await this.dataSource
      .getRepository(UserCatEntity)
      .find({ where: { userId: id } });

    const dtoPromises = userCats.map(async (userCatEntity) => {
      const catDto = new CatDTO(
        await this.dataSource.getRepository(Cats).findOne({
          where: { id: userCatEntity.catId },
        }),
      );

      const accessoryDto = new AccessoryDTO(
        userCatEntity.accessoryId
          ? await this.dataSource
              .getRepository(Accessories)
              .findOne({ where: { id: userCatEntity.accessoryId } })
          : undefined,
      );

      return new UserCatDto(catDto, accessoryDto);
    });

    return await Promise.all(dtoPromises);
  }

  async updateUserCatAccessory(id: string, userCatPatchDto: UserCatPatchDto) {
    const userCat = await this.dataSource.getRepository(UserCatEntity).findOne({
      where: {
        userId: id,
        catId: userCatPatchDto.catId,
      },
    });
    userCat.accessoryId = userCatPatchDto.accessoryId;
    await this.dataSource.getRepository(UserCatEntity).save(userCat);

    const cat = await this.dataSource
      .getRepository(Cats)
      .findOne({ where: { id: userCatPatchDto.catId } });

    const accessory = await this.dataSource
      .getRepository(Accessories)
      .findOne({ where: { id: userCatPatchDto.accessoryId } });

    return new UserCatDto(new CatDTO(cat), new AccessoryDTO(accessory));
  }
}

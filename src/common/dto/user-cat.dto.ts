import { CatDTO } from './cat.dto';
import { AccessoryDTO } from './accessory.dto';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

export class UserCatDto {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CatDTO)
  catData: CatDTO;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AccessoryDTO)
  accessoryData: AccessoryDTO;

  constructor(catDto: CatDTO, accessoryDto: AccessoryDTO) {
    this.catData = catDto;
    this.accessoryData = accessoryDto;
  }
}

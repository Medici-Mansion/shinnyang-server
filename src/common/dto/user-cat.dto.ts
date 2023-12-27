import { CatDTO } from './cat.dto';
import { AccessoryDTO } from './accessory.dto';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCatDto {
  @ApiProperty({
    description: '냥이 아이디',
    example: 'be17e0ab-6463-4db8-bdfa-bc9011193038',
  })
  @IsUUID('all')
  catId: string;

  @ApiProperty({ description: '냥이 이름', example: '우무' })
  @IsString()
  catName: string;

  @ApiProperty({ description: '냥이 객체코드 (영어이름)', example: 'umu' })
  @IsString()
  catCode: string;

  @ApiProperty({
    description: '악세사리 아이디',
    example: '53227c7f-9dde-4adb-b448-69664fcae813',
  })
  @IsUUID('all')
  accessoryId?: string;

  @ApiProperty({ description: '악세사리 이름', example: '빵 모자' })
  @IsString()
  accessoryName?: string;

  @ApiProperty({ description: '악세사리 객체코드 ', example: 'AC-H-1' })
  @IsString()
  accessoryCode?: string;

  constructor(catDto: CatDTO, accessoryDto: AccessoryDTO) {
    if (accessoryDto) {
      this.accessoryCode = accessoryDto.code;
      this.accessoryId = accessoryDto.id;
      this.accessoryName = accessoryDto.name;
    }
    this.catCode = catDto.code;
    this.catId = catDto.id;
    this.catName = catDto.name;
  }
}

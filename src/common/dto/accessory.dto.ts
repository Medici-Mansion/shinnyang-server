import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Accessories } from '../entities/accessories.entity';

export class AccessoryDTO {
  @ApiProperty({
    description: '아이디',
    example: '53227c7f-9dde-4adb-b448-69664fcae813',
  })
  @IsUUID('all')
  id: string;

  @ApiProperty({ description: '이름', example: '빵 모자' })
  @IsString()
  name: string;

  @ApiProperty({ description: '객체코드 ', example: 'AC-H-1' })
  @IsString()
  code: string;

  @ApiProperty({
    description: '냥이가 착용할 악세사리 이미지 경로',
    example:
      'https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/qd9ynd5orpvhdrofkmmt',
  })
  @IsString()
  fullImage: string;

  @ApiProperty({
    description: '사용자가 선택할 아이콘 경로',
    example:
      'https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/bdt7uzuivuuwazfprgq7',
  })
  @IsString()
  iconImage: string;

  constructor(accessory: Accessories) {
    this.id = accessory.id;
    this.name = accessory.name;
    this.code = accessory.code;
    this.fullImage = accessory.fullImage;
    this.iconImage = accessory.iconImage;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Cats } from '../entities/cats.entity';

export class CatDTO {
  @ApiProperty({
    description: '아이디',
    example: 'be17e0ab-6463-4db8-bdfa-bc9011193038',
  })
  @IsUUID('all')
  id: string;

  @ApiProperty({ description: '이름', example: '우무' })
  @IsString()
  name: string;

  @ApiProperty({ description: '객체코드 (영어이름)', example: 'umu' })
  @IsString()
  code: string;

  @ApiProperty({
    description: '메인 (우체국) 이미지 주소',
    example:
      'https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/qrlibxs63hintzlq7jsh.png',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: '얼굴 이미지 주소',
    example:
      'https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/qrlibxs63hintzlq7jsh.png',
  })
  @IsString()
  faceImage: string;

  @ApiProperty({
    description: '뒷모습 이미지 주소',
    example:
      'https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/qrlibxs63hintzlq7jsh.png',
  })
  @IsString()
  backImage: string;

  @ApiProperty({
    description: '년도 이미지 주소',
    example:
      'https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/qrlibxs63hintzlq7jsh.png',
  })
  @IsString()
  yearImage: string;

  constructor(cats: Cats) {
    this.id = cats.id;
    this.code = cats.code;
    this.image = cats.image;
    this.name = cats.name;
    this.faceImage = cats.faceImage;
    this.backImage = cats.backImage;
    this.yearImage = cats.yearImage;
  }
}

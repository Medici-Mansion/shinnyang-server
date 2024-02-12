import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LetterCountDTO {
  @ApiProperty({
    description: '만들어진 편지 갯수',
    example: 104,
  })
  @IsNumber()
  letterCount: number;

  constructor(letterCount: number) {
    this.letterCount = letterCount;
  }
}

import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCatPatchDto {
  @ApiProperty({
    description: '고양이아이디',
    example: 'be17e0ab-6463-4db8-bdfa-bc9011193038',
  })
  @IsUUID('all')
  catId: string;

  @ApiProperty({
    description: '악세사리아이디',
    example: 'be17e0ab-6463-4db8-bdfa-bc9011193038',
  })
  @IsUUID('all')
  accessoryId: string;
}

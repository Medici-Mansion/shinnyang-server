import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ChangeNicknameDTO {
  @ApiProperty({ description: '번경할 닉네임', default: '츄츄' })
  @IsString()
  @MaxLength(6)
  nickname: string;
}

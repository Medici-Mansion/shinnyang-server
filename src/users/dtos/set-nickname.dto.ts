import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeNicknameDTO {
  @ApiProperty({ description: '번경할 닉네임', default: '츄츄' })
  @IsString()
  nickname: string;
}

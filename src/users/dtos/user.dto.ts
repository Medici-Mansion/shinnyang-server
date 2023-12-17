import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '회원 아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '회원 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '회원 닉네임' })
  nickname: string;

  @ApiProperty({
    description: '회원의 현재 상태 e.g. (active, sleep, withdrawal',
  })
  status: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';

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

export class UserResponse {
  @ApiProperty({ description: '회원 아이디' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '회원 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '회원 닉네임' })
  nickname: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
  }
}

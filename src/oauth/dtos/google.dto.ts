import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { JWT } from 'src/auth/dtos/jwt.dto';
import { UserResponse } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';

export class GoogleUserInfo {
  @ApiProperty({ description: '아이디' })
  @IsString()
  id: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '이메일 검증 여부' })
  @IsBoolean()
  verified_email: boolean;

  @ApiProperty({ description: '프로필 사진 주소' })
  @IsOptional()
  @IsString()
  picture: string;
}

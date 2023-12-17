import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { JWT } from 'src/auth/dtos/jwt.dto';
import { UserResponse } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';

export class GoogleUserInfo {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  verified_email: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  picture: string;
}

export class GoogleAuthResponse {
  token: JWT;
  user: UserResponse;

  constructor(token: JWT, user: User) {
    this.token = token;
    this.user = new UserResponse(user);
  }
}

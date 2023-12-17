import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class GoogleUserInfo {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  verified_email: boolean;

  @IsOptional()
  @IsString()
  picture: string;
}

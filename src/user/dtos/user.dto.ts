import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserStatus } from 'src/entities/User';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserResponseDto {
  id: number;
  email: string;
  userStatus: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(
    id: number,
    email: string,
    userStatus: UserStatus,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.userStatus = userStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

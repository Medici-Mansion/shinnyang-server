import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Post()
  //   create(@Body() createUserDto: CreateUserDto) {
  //     // 작업들

  //       return userdata: CreateUserDto
  //   }
}

// 이메일 ,닉네임

// 닉네임 updateUserDto

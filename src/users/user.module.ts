import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserCatRepository } from '../common/user-cat.repository';
import { CommonService } from '../common/common.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserCatRepository, CommonService],
  exports: [UserService],
})
export class UserModule {}

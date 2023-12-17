import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from 'src/entities/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(email: string, nickname: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.nickname = nickname;
    user.status = UserStatus.ACTIVE;

    return this.usersRepository.save(user);
  }
}

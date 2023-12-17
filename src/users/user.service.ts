import { UserResponse } from './dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import {
  PostUserRequestDto,
  PostUserResponseDto,
} from './dtos/create-users.dto';
import { createResponse } from 'src/utils/response.utils';

@Injectable()
export class UserService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async createUser(postUserRequestDto: PostUserRequestDto) {
    const { email } = postUserRequestDto;
    const result = await this.connection
      .createQueryBuilder(User, 'users')
      .insert()
      .into<User>('users')
      .values([{ email }])
      .returning('id')
      .execute();

    return createResponse(new PostUserResponseDto(result.generatedMaps[0].id));
  }

  async create(postUserRequestDto: PostUserRequestDto) {
    const { email } = postUserRequestDto;
    const repository = this.connection.getRepository(User);
    const result = await repository.save(repository.create({ email }));

    return result;
  }

  async findByUserEmail(email: string) {
    const result = await this.connection
      .createQueryBuilder(User, 'users')
      .where('users.email = :email', { email })
      .getOne();

    return result;
  }

  async getMe(id: number) {
    const user = await this.connection
      .getRepository(User)
      .findOne({ where: { id } });
    return new UserResponse(user);
  }
}

import { UserRepository } from './user.repository';
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
import { ChangeNicknameDTO } from './dtos/set-nickname.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private readonly connection: DataSource,
    private readonly userRepository: UserRepository,
  ) {}

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

  /**
   * 사용자를 생성하고 반환한다
   *
   * @issue SNP-64
   * @author raymondanything
   * @param {PostUserRequestDto} postUserRequestDto
   * @returns {Promise<User>} user
   */
  async create(postUserRequestDto: PostUserRequestDto): Promise<User> {
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

  /**
   * 내정보를 조회한다
   *
   * @issue SNP-64
   * @author raymondanything
   * @param {number} id
   * @returns {Promise<UserResponse>} UserResponse
   */
  async getMe(id: number): Promise<UserResponse> {
    const user = await this.connection
      .getRepository(User)
      .findOne({ where: { id } });
    return new UserResponse(user);
  }

  /**
   * 닉네임을 설정 / 변경한다.
   *
   * @issue SNP-64
   * @link https://www.notion.so/raymondanything/SNP-64-Google-b3c69d93313d47fba51201412b70c635?pvs=4
   * @author raymondanything
   * @param userId
   * @param changeNicknameDTO
   * @returns {Promise<boolean>}
   */
  async changeNickname(
    userId: number,
    changeNicknameDTO: ChangeNicknameDTO,
  ): Promise<boolean> {
    try {
      await this.userRepository.updateAndReturning(userId, changeNicknameDTO);
      return true;
    } catch (error) {
      return false;
    }
  }
}

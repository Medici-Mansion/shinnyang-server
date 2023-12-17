import { DataSource, DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';

export class UserRepository extends Repository<User> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async updateAndReturning(userId: number, userLike: DeepPartial<User>) {
    return await this.update(userId, userLike);
  }
}

import { DataSource, Repository } from 'typeorm';
import { UserCatEntity } from './entities/user-cat.entity';
import { InjectDataSource } from '@nestjs/typeorm';

export class UserCatRepository extends Repository<UserCatEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserCatEntity, dataSource.createEntityManager());
  }
}

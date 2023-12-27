import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_cat' })
export class UserCatEntity extends BaseEntity {
  @Column({
    name: 'user_id',
    comment: '유저아이디',
    unique: false,
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'cat_id',
    comment: '고양이아이디',
    unique: false,
    nullable: false,
  })
  catId: string;

  @Column({
    name: 'accessory_id',
    comment: '악세사리아이디',
    unique: false,
    nullable: true,
  })
  accessoryId: string;
}

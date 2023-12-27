import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from 'src/users/entities/user.entity';
import { Cats } from './cats.entity';
import { Accessories } from './accessories.entity';

@Entity({ name: 'user_cat' })
export class UserCatEntity extends BaseEntity {
  @Column({
    name: 'user_id',
    comment: '유저아이디',
    unique: false,
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'cat_id',
    comment: '고양이아이디',
    unique: false,
    nullable: false,
  })
  catId: string;

  @ManyToOne(() => Cats, (cats) => cats.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'cat_id' })
  cat: Cats;

  @Column({
    name: 'accessory_id',
    comment: '악세사리아이디',
    unique: false,
    nullable: true,
  })
  accessoryId: string;
  @ManyToOne(() => Accessories, (accessories) => accessories.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'accessory_id' })
  accessory: Accessories;
}

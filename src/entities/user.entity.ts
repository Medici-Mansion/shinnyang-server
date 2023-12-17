import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

enum UserStatus {
  ACTIVE = 'active',
  SLEEP = 'sleep',
  WITHDRAWAL = 'withdrawal',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    name: 'email',
    comment: '사용자 이메일',
    unique: true,
  })
  email: string;

  @Column({
    name: 'nickname',
    nullable: true,
    comment: '사용자 닉네임',
  })
  nickname: string;

  @Column({
    name: 'status',
    comment: '사용자의 회원 상태',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
}

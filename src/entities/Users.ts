import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

enum UserStatus {
  ACTIVE = 'active',
  SLEEP = 'sleep',
  WITHDRAWAL = 'withdrawal',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateadAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

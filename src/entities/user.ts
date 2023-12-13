import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

enum UserStatus {
  ACTIVE = 'active',
  SLEEP = 'sleep',
  WITHDRAWAL = 'withdrawal',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string | null;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateadAt: string | null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: string | null;
}

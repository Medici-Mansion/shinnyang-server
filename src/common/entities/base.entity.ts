import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '아이디' })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일자',
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일자',
    default: new Date(),
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', comment: '삭제일자' })
  deletedAt: Date | null;
}

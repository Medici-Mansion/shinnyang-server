import { BaseEntity } from 'src/common/entities/base.entity';
import { Cats } from 'src/common/entities/cats.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'letters' })
export class Letter extends BaseEntity {
  @Column({
    name: 'sender_id',
    comment: '편지 쓰는 사용자 아이디',
    nullable: false,
  })
  senderId: string;

  @Column({
    name: 'sender_nickname',
    comment: '편지 쓰는 사용자 닉네임',
    nullable: false,
  })
  senderNickname: string;

  @Column({
    name: 'receiver_nickname',
    comment: '편지 받는 사용자 닉네임',
  })
  receiverNickname: string;

  @Column({ name: 'content', comment: '편지 내용', nullable: false })
  content: string;

  @OneToOne(() => Cats, (cats) => cats.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'cat_type_id' })
  catType: Cats;

  @Column({
    name: 'cat_type_id',
    comment: '고양이 타입 아이디',
    type: 'uuid',
    nullable: true,
  })
  catTypeId: string;
}

import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'letters' })
export class Letter extends BaseEntity {
  @Column({
    name: 'sender_id',
    comment: '편지 쓰는 사용자 아이디',
    nullable: true,
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
    nullable: false,
  })
  receiverNickname: string;

  @Column({ name: 'content', comment: '편지 내용' })
  content: string;

  @Column({ name: 'cat_name', comment: '고양이 이름' })
  catName: string;
}

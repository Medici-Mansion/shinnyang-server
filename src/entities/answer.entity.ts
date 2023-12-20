import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity({ name: 'answers' })
export class Answer extends BaseEntity {
  @Column({
    name: 'sender_id',
    comment: '답장하는 사용자 아이디',
    nullable: true,
  })
  senderId: string;

  @Column({
    name: 'receiver_id',
    comment: '답장받는 사용자 아이디',
    nullable: false,
  })
  receiverId: string;

  @Column({
    name: 'sender_nickname',
    comment: '답장하는 사용자 닉네임',
    nullable: false,
  })
  senderNickname: string;

  @Column({
    name: 'receiver_nickname',
    comment: '답장받는 사용자 닉네임',
    nullable: false,
  })
  receiverNickname: string;

  @Column( {
    name: 'cat_type',
    comment: '고양이 타입',
    nullable: false
  })
  catType: string;

  @Column({ name: 'content', comment: '답장 내용', nullable: false })
  content: string;
}

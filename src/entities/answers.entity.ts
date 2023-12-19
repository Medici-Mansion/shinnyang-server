import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'letters' })
export class Letter extends BaseEntity {
  @Column({
    name: 'sender_id',
    comment: '보낸 사용자 아이디',
    nullable: false,
  })
  senderId: string;

  @Column({ name: 'sender_nickname', nullable: false })
  senderNickname: string;

  @Column({ name: 'receiver_name', nullable: false })
  receiverName: string;

  @Column({ name: 'content', nullable: false })
  content: string;
}

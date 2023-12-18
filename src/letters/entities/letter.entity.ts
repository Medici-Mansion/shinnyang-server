import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'letters' })
export class Letter extends BaseEntity {
  @Column({
    name: 'receiver_id',
    nullable: true,
    comment: '받는 사용자 아이디',
  })
  receiverId: number;

  @Column({
    name: 'sender_id',
    nullable: true,
    comment: '보낸 사용자 아이디',
  })
  senderId: number;

  // @JoinColumn()
  // receiver: User

  // @JoinColumn()
  // sender: User

  @Column()
  content: string;

  @Column({ name: 'sender_nickname', nullable: true })
  senderNickname: string;
}

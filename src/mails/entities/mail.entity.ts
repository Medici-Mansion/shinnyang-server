import { BaseEntity } from 'src/common/entities/base.entity';
import { Letter } from 'src/entities/letter.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'mails' })
export class Mail extends BaseEntity {
  @Column({
    type: 'uuid',
    comment: '메일을 보유한 사용자 아이디',
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'uuid', comment: '메일의 편지 아이디', name: 'letter_id' })
  letterId: string;

  @ManyToOne(() => Letter, (Letter) => Letter.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'letter_id', referencedColumnName: 'id' })
  letter: Letter;

  @Column({
    type: 'uuid',
    comment: '답장하기를 통해 보낸 편지 아이디',
    name: 'received_letter_id',
    nullable: true,
  })
  replyLetterId: string;

  @OneToOne(() => Letter, (Letter) => Letter.id, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'received_letter_id', referencedColumnName: 'id' })
  replyLetter: Letter;

  @Column({
    name: 'is_read',
    comment: '편지 확인 여부',
    default: false,
  })
  isRead: boolean;
}

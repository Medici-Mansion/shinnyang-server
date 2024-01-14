import { BaseEntity } from 'src/common/entities/base.entity';
import { LETTER_TYPE } from 'src/letters/entities/letter.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'KA_SHARE_ST' })
export class KakaoShareCallbackStatistic extends BaseEntity {
  @Column({
    name: 'chat_type',
    comment: `카카오톡 공유 메시지가 전달된 채팅방의 타입`,
  })
  chatType: string;

  @Column({
    name: 'hash_chat_id',
    comment: '카카오톡 공유 메세지를 수신한 채팅방의 참고용 ID',
  })
  hashChatId: string;

  @Column({ name: 'template_id', comment: '메세지 템플릿 ID' })
  templateId: number;

  @Column({ name: 'letter_id', type: 'uuid' })
  letterId: string;

  @Column({
    name: 'letter_type',
    comment: '편지 타입',
    type: 'enum',
    enum: LETTER_TYPE,
    nullable: true,
  })
  letterType: LETTER_TYPE;
}

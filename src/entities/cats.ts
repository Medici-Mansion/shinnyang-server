import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';
import { UrlWithStringQuery } from 'url';

@Entity({ name: 'user' })
export class Cats extends BaseEntity {
  @Column({
    name: 'cat-emoji',
    nullable: false,
    comment: '고양이 이모지',
  })
  catEmoji: string;
}

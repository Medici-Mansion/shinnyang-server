import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('accessories')
export class Accessories extends BaseEntity {
  @Column({ name: 'name', comment: '표기 이름', nullable: true })
  name: string;

  @Column({ name: 'code', comment: '코드명', nullable: true })
  code: string;

  @Column({
    name: 'fullImage',
    comment: '냥이가 착용할 악세사리 이미지 경로',
    nullable: true,
  })
  fullImage: string;

  @Column({
    name: 'iconImage',
    comment: '사용자가 선택할 아이콘 경로',
    nullable: true,
  })
  iconImage: string;
}

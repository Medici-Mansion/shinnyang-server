import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'cats' })
export class Cats extends BaseEntity {
  @Column({ name: 'name', comment: '표기 이름', nullable: true })
  name: string;

  @Column({ name: 'code', comment: '코드명', nullable: true })
  code: string;

  @Column({ name: 'image', comment: '이미지 경로', nullable: true })
  image: string;

  @Column({ name: 'sub_image', comment: '이미지 경로', nullable: true })
  subImage: string;
}

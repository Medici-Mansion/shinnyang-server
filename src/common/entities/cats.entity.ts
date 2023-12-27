import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'cats' })
export class Cats extends BaseEntity {
  @Column({ name: 'name', comment: '표기 이름', nullable: true })
  name: string;

  @Column({ name: 'code', comment: '코드명', nullable: true })
  code: string;

  @Column({
    name: 'image',
    comment: '메인 (우체국) 이미지 경로',
    nullable: true,
  })
  image: string;

  @Column({ name: 'face_image', comment: '얼굴 이미지 경로', nullable: true })
  faceImage: string;

  @Column({ name: 'back_image', comment: '뒷모습 이미지 경로', nullable: true })
  backImage: string;

  @Column({ name: 'year_image', comment: '년도 이미지 경로', nullable: true })
  yearImage: string;
}

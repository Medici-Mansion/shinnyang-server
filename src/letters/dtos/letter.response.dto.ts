import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { Letter } from '../../entities/letter.entity';

export class LetterDetailDto {
  @ApiProperty({ description: '편지 아이디' })
  @IsUUID('all')
  id: string;

  @ApiProperty({ description: '보낸 사용자 아이디', default: '1' })
  @IsUUID('all')
  senderId: string;

  @ApiProperty({ description: '보낸 사용자 닉네임', default: '홍길동' })
  @IsString()
  senderNickname: string;

  @ApiProperty({ description: '받는 사용자 이름', default: '덕배' })
  @IsString()
  receiverName: string;

  @ApiProperty({
    description: '내용',
    default: '이 편지는 영국에서부터 시작되어...',
  })
  @IsString()
  content: string;

  @ApiProperty({ description: '생성일자' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '수정일자' })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ description: '삭제일자' })
  @IsOptional()
  @IsDate()
  deletedAt: Date | null;

  constructor(lettersEntity: Letter) {
    this.id = lettersEntity.id;
    this.receiverName = lettersEntity.receiverName;
    this.content = lettersEntity.content;
    this.senderId = lettersEntity.senderId;
    this.senderNickname = lettersEntity.senderNickname;
    this.createdAt = lettersEntity.createdAt;
    this.updatedAt = lettersEntity.updatedAt;
    this.deletedAt = lettersEntity.deletedAt;
  }
}

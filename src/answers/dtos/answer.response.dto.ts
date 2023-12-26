import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Answer } from '../../entities/answer.entity';

export class AnswerDetailDto {
  @ApiProperty({ description: '답장 아이디', default: '{answerId}' })
  @IsUUID('all')
  id: string;

  @ApiProperty({ description: '보낸 사용자 아이디', default: '{senderId}' })
  @IsUUID('all')
  @IsOptional()
  senderId: string | null;

  @ApiProperty({ description: '보낸 사용자 닉네임', default: '홍길동' })
  @IsString()
  senderNickname: string;

  @ApiProperty({ description: '받는 사용자 아이디', default: '{uuid}' })
  @IsUUID('all')
  receiverId: string;

  @ApiProperty({ description: '받는 사용자 이름', default: '덕배' })
  @IsString()
  receiverNickname: string;

  @ApiProperty({
    description: '내용',
    default: '이 편지는 영국에서부터 시작되어...',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '고양이 이름',
    default: 'amu',
  })
  @IsString()
  catName: string;

  @IsBoolean()
  isRead: boolean;

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

  constructor(answer: Answer) {
    this.id = answer.id;
    this.senderId = answer.senderId;
    this.senderNickname = answer.senderNickname;
    this.receiverId = answer.receiverId;
    this.receiverNickname = answer.receiverNickname;
    this.content = answer.content;
    this.catName = answer.catName;
    this.isRead = answer.isRead;
    this.createdAt = answer.createdAt;
    this.updatedAt = answer.updatedAt;
    this.deletedAt = answer.deletedAt;
  }
}

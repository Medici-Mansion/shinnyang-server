import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Letters } from '../entities/letters.entity';

export class LetterDto {
  @ApiProperty({ description: '아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '받는 사용자 아이디', default: null })
  @IsOptional()
  @IsNumber()
  receiverId: number | null;

  @ApiProperty({ description: '보낸 사용자 아이디', default: null })
  @IsOptional()
  @IsNumber()
  senderId: number | null;

  @ApiProperty({ description: '내용', default: '안녕하세요' })
  @IsString()
  content: string;

  @ApiProperty({ description: '보낸 사용자 닉네임' })
  senderNickname: string;
}

export class GetLettersResponseDto extends LetterDto {
  constructor(lettersEntity: Letters) {
    super();
    this.id = lettersEntity.id;
    this.receiverId = lettersEntity.receiverId;
    this.senderId = lettersEntity.senderId;
    this.content = lettersEntity.content;
    this.senderNickname = lettersEntity.senderNickname;
  }
}
import { ApiProperty } from '@nestjs/swagger';
import { Mail } from '../entities/mail.entity';
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';

export class LetterFromMailResponseDTO {
  @ApiProperty()
  @IsUUID('all')
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  senderId: string;

  @ApiProperty()
  @IsString()
  senderNickname: string;

  @ApiProperty()
  @IsString()
  receiverNickname: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  catName: string;

  @ApiProperty()
  @IsBoolean()
  isRead: boolean;

  @ApiProperty()
  @IsBoolean()
  isRespond: boolean;

  constructor(
    letter: Mail['letter'] & { replyLetterId: string | null; isRead: boolean },
  ) {
    this.id = letter.id;
    this.createdAt = letter.createdAt;
    this.updatedAt = letter.updatedAt;
    this.senderId = letter.senderId;
    this.senderNickname = letter.senderNickname;
    this.receiverNickname = letter.receiverNickname;
    this.content = letter.content;
    this.catName = letter.catName;
    this.isRead = letter.isRead;
    this.isRespond = !!letter.replyLetterId;
  }
}

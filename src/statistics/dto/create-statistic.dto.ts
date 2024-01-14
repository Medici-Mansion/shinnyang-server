import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { LETTER_TYPE } from 'src/letters/entities/letter.entity';

export class CreateKakaoShareStatisticRequestDto {
  @ApiProperty({
    description: `    
  카카오톡 공유 메세지가 전달된 채딩방의 타입
  MemoChat: 나와의 채팅방
  DirectChat: 다른 사용자와의 1:1 채팅방
  MultiChat: 다른 사용자들과의 그룹 채팅방
  OpenDirectChat: 1:1 오픈채팅방
  OpenMultiChat: 그룹 오픈채팅방`,
  })
  @IsString()
  CHAT_TYPE: string;
  @ApiProperty()
  @IsString()
  HASH_CHAT_ID: string;
  @ApiProperty()
  @IsNumber()
  TEMPLATE_ID: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID('all')
  letterId?: string;

  @ApiProperty({ description: '답장하기 일 경우, 답장하는 메일의 아이디' })
  @IsOptional()
  @IsEnum(LETTER_TYPE)
  letterType?: LETTER_TYPE;
}

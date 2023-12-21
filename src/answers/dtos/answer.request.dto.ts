import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Answer } from '../../entities/answer.entity';

export class CreateAnswerDto {
  @ApiProperty({ description: '보내는 사용자 아이디', default: '{uuid}' })
  @IsUUID('all')
  @IsOptional()
  senderId: string | null;

  @ApiProperty({ description: '보내는 사용자 닉네임', default: '홍길동' })
  @IsString()
  senderNickname: string;

  @ApiProperty({ description: '받는 사용자 아이디', default: '{uuid}' })
  @IsUUID('all')
  receiverId: string;

  @ApiProperty({ description: '받는 사용자 이름', default: '덕배' })
  @IsString()
  receiverNickname: string;

  @ApiProperty({
    description: '보낼 편지의 내용',
    default: '이 편지는 영국에서부터 시작되어..',
  })
  @IsString()
  content: string;

  @ApiProperty({ description: '고양이 이름', default: 'umu' })
  @IsString()
  catName: string;
}

export function toEntity(createAnswerDto: CreateAnswerDto): Answer {
  const answer = new Answer();
  answer.senderId = createAnswerDto.senderId;
  answer.senderNickname = createAnswerDto.senderNickname;
  answer.receiverId = createAnswerDto.receiverId;
  answer.receiverNickname = createAnswerDto.receiverNickname;
  answer.content = createAnswerDto.content;
  answer.catName = createAnswerDto.catName;
  answer.isRead = false;
  return answer;
}

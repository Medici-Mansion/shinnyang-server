import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Letter } from '../../entities/letter.entity';

export class CreateLetterDto {
  @ApiProperty({ description: '보내는 사용자 닉네임', default: '홍길동' })
  @IsString()
  senderNickname: string;

  @ApiProperty({ description: '받는 사용자 이름', default: '덕배' })
  @IsString()
  receiverNickname: string;

  @ApiProperty({
    description: '보낼 편지의 내용',
    default: '이 편지는 영국에서부터 시작되어...',
  })
  @IsString()
  content: string;

  @ApiProperty({ description: '고양이 이름', default: 'umu' })
  @IsString()
  catName: string;

  @ApiProperty({ description: '답장하기 일 경우, 답장하는 메일의 아이디' })
  @IsOptional()
  @IsUUID('all')
  replyMailId: string;
}

export function toEntity(
  userId: string,
  createLetterDto: CreateLetterDto,
): Letter {
  const letter = new Letter();
  letter.senderId = userId;
  letter.senderNickname = createLetterDto.senderNickname;
  letter.receiverNickname = createLetterDto.receiverNickname;
  letter.content = createLetterDto.content;
  letter.catName = createLetterDto.catName;
  return letter;
}

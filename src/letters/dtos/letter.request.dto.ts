import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
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

  @ApiProperty({ description: '고양이 타입 아이디' })
  @IsUUID()
  catTypeId: string;
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
  letter.catTypeId = createLetterDto.catTypeId;
  return letter;
}

import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { LetterResponseDto } from './letter.response.dto';
import { Letter } from '../../entities/letter.entity';

export class PostLetterRequestDto {
  @ApiProperty({ description: '보내는 사용자 아이디' })
  @IsUUID()
  senderId: string;

  @ApiProperty({ description: '보내는 사용자 닉네임' })
  @IsString()
  senderNickname: string;

  @ApiProperty({ description: '받는 사용자 이름', default: '덕배' })
  @IsString()
  receiverName: string;

  @ApiProperty({
    description: '보낼 편지의 내용',
    default: '이 편지는 영국에서부터 시작되어...',
  })
  @IsString()
  content: string;
}

export function toEntity(postLetterRequestDto: PostLetterRequestDto): Letter {
  const letter = new Letter();
  letter.senderId = postLetterRequestDto.senderId;
  letter.senderNickname = postLetterRequestDto.senderNickname;
  letter.receiverName = postLetterRequestDto.receiverName;
  letter.content = postLetterRequestDto.content;
  return letter;
}

export class PostLetterResponseDto extends PickType(LetterResponseDto, ['id']) {
  constructor(id: string) {
    super();
    this.id = id;
  }
}

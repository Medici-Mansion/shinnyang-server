import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { LetterDto } from './letter.dto';

export class PostLetterRequestDto {
  @ApiProperty({ description: '보낼 편지의 내용', default: '안녕하세요' })
  @IsString()
  content: string;

  @ApiProperty({ description: '전달 받을 사용자 아이디' })
  @ApiProperty()
  @IsNumber()
  receiverId: number | null;

  @ApiProperty({ description: '보내는 사용자 아이디' })
  @IsOptional()
  @IsNumber()
  senderId: number | null;

  @ApiProperty({ description: '보내는 사용자 닉네임' })
  @IsString()
  senderNickname: string;
}

export class PostLetterResponseDto extends PickType(LetterDto, ['id']) {
  constructor(id: number) {
    super();
    this.id = id;
  }
}

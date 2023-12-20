import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ description: '보내는 사용자 닉네임', default: '홍길동' })
  @IsString()
  senderNickname: string;

  @ApiProperty({ description: '받는 사용자 아이디', default: '{uuid}' })
  @IsUUID()
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
}

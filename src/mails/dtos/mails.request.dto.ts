import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SaveMailRequestDTO {
  @ApiProperty({ description: '저장할 편지 아이디' })
  @IsUUID('all')
  letterId: string;
}

export class ReadMailRequestDTO {
  @ApiProperty({ description: '읽음처리할 메일 아이디' })
  @IsUUID('all')
  mailId: string;
}

export class UpdateMailRequetDTO {
  @ApiProperty({ description: '메일 아이디' })
  @IsUUID('all')
  mailId: string;

  @ApiProperty({ description: '답장으로 저장할 편지 아이디' })
  @IsUUID('all')
  replyLetterId: string;
}

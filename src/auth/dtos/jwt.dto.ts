import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class JWT {
  @ApiProperty({ description: '엑세스 토큰' })
  @IsString()
  access: string;

  @ApiProperty({ description: '리프레시 토큰' })
  @IsString()
  refresh: string;

  constructor(token: JWT) {
    this.access = token.access;
    this.refresh = token.refresh;
  }
}

export class Payload {
  @ApiProperty({ description: 'Guard를 통과한 후 사용자 아이디' })
  @IsUUID('all')
  id: string;
}

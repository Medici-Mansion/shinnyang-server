import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JWT {
  @ApiProperty()
  @IsString()
  access: string;

  @ApiProperty()
  @IsString()
  refresh: string;

  constructor(token: JWT) {
    this.access = token.access;
    this.refresh = token.refresh;
  }
}

export class Payload {
  @IsString()
  id: number;
}

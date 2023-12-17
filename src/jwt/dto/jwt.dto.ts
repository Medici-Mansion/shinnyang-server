import { IsString } from 'class-validator';

export class JWT {
  @IsString()
  access: string;
  @IsString()
  refresh: string;
}

export class Payload {
  @IsString()
  id: number;
}

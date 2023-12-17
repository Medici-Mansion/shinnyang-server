import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class PostUserRequestDto {
  @ApiProperty({ description: '사용자 이메일' })
  @IsString()
  email: string;
}

export class PostUserResponseDto extends PickType(UserDto, ['id']) {
  constructor(id: number) {
    super();
    this.id = id;
  }
}

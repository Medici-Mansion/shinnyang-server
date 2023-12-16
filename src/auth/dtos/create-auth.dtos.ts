import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostAccessTokenRequestDto {
  @ApiProperty({ description: '인가 코드 받기 요청으로 얻은 인가 코드' })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class PostAccessTokenResponseDto {
  @ApiProperty({ description: '사용자 액세스 토큰 값' })
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty({ description: '토큰 타입, bearer로 고정' })
  @IsString()
  @IsNotEmpty()
  token_type: string;

  @ApiProperty({
    description:
      '액세스 토큰과 ID 토큰의 만료 시간(초) 참고: 액세스 토큰과 ID 토큰의 만료 시간은 동일',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @ApiProperty({
    description:
      '액세스 토큰과 ID 토큰의 만료 시간(초) 참고: 액세스 토큰과 ID 토큰의 만료 시간은 동일',
  })
  @IsNumber()
  @IsNotEmpty()
  expires_in: Number;

  @ApiProperty({
    description:
      '인증된 사용자의 정보 조회 권한 범위, 범위가 여러 개일 경우, 공백으로 구분',
  })
  @IsString()
  scope: string;

  @ApiProperty({
    description: '리프레시 토큰 만료 시간(초)',
  })
  @IsNumber()
  @IsNotEmpty()
  refresh_token_expires_in: Number;
}

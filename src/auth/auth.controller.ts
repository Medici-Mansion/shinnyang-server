import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { JWT } from './dtos/jwt.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '토큰 재발급',
    description: '리프레스 토큰 검증 후 재발급',
  })
  @ApiBody({
    type: String,
    description: '리프레시',
    required: true,
    schema: {
      properties: {
        refresh: {
          type: 'string',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: '재발급된 토큰',
    schema: {
      example: {
        access:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1....yrIzzKZwDQ',
        refresh:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1....b-Ct7gGJBA',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Post('refresh')
  async refreshToken(@Body('refresh') refreshToken: string): Promise<JWT> {
    console.log('1111');
    console.log(refreshToken);
    return await this.authService.refreshToken(refreshToken);
  }
}

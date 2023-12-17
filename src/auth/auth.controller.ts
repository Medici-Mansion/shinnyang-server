import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('OAuth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}

// 컨트롤러 -> 서비스 -> 레포
// 엔드포인트 비즈니스로직 db접근

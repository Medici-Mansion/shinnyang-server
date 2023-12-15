import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async createToken() {
    return await this.authRepo.createtoken();
    // 비즈니스 로직
  }
}

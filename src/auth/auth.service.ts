import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly http: HttpService,
  ) {}
}

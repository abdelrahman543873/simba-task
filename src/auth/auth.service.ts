import { env } from './../utils/env';
import { Injectable } from '@nestjs/common';
import { BaseHttpException } from 'src/exceptions/base-http-exception';
import { UserRepository } from '../user/user.repository';
import { AuthInput } from './inputs/auth.input';
import { bcryptCheckPass } from '../utils/bcrypt.util';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(input: AuthInput) {
    const user = await this.userRepo.findUserByEmail(input.email);
    if (!user) {
      throw new BaseHttpException('EN', 600);
    }
    const correctPass = await bcryptCheckPass(input.password, user.password);
    if (!correctPass) throw new BaseHttpException('EN', 601);
    const token = sign({ userId: user.id }, env.JWT_SECRET);
    user.token = token;
    return user;
  }
}

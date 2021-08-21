import { env } from '../shared/utils/env';
import { Injectable } from '@nestjs/common';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { UserRepository } from '../user/user.repository';
import { AuthInput } from './inputs/auth.input';
import { bcryptCheckPass } from '../shared/utils/bcrypt.util';
import { sign } from 'jsonwebtoken';
import { LangEnum } from '../shared/app.enum';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(input: AuthInput) {
    const user = await this.userRepo.findUserByEmail(input.email);
    if (!user) throw new BaseHttpException(LangEnum.EN, 600);
    const correctPass = await bcryptCheckPass(input.password, user.password);
    if (!correctPass) throw new BaseHttpException(LangEnum.EN, 601);
    const token = sign({ userId: user.id }, env.JWT_SECRET);
    user.token = token;
    return user;
  }
}

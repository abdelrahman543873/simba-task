import { env } from '../shared/utils/env';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterInput } from './inputs/user.input';
import { sign } from 'jsonwebtoken';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { LangEnum } from '../shared/app.enum';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(input: RegisterInput) {
    const existingUser = await this.userRepo.findUserByEmail(input.email);
    if (existingUser) throw new BaseHttpException(LangEnum.EN, 607);
    const user = await this.userRepo.addUser(input);
    const token = sign({ userId: user['id'] }, env.JWT_SECRET);
    user['token'] = token;
    return user;
  }

  async userList() {
    return await this.userRepo.userList();
  }
}

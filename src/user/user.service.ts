import { env } from '../shared/utils/env';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterInput } from './inputs/user.input';
import { sign } from 'jsonwebtoken';
import { TransactionRepository } from '../transaction/transaction.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(input: RegisterInput) {
    const user = await this.userRepo.addUser(input);
    const token = sign({ userId: user['id'] }, env.JWT_SECRET);
    user['token'] = token;
    return user;
  }
}

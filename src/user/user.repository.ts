import { Injectable } from '@nestjs/common';
import { hashPass } from '../shared/utils/bcrypt.util';
import { RegisterInput } from './inputs/user.input';
import { User } from './models/user.model';
import { Transaction } from '../transaction/models/transaction.model';

@Injectable()
export class UserRepository {
  private readonly Model = User;

  async addUser(user: RegisterInput) {
    const userRecord = await this.Model.create({
      ...user,
      password: await hashPass(user.password),
    });
    await Transaction.create({
      from: null,
      to: userRecord.id,
      currency: 'USD',
      amount: 1000,
    });
    return userRecord;
  }

  async findUserByEmail(email: string) {
    return await this.Model.findOne({
      where: { email },
      raw: true,
    });
  }

  async findUserById(id: string) {
    return await this.Model.findOne({
      where: { id },
    });
  }
}

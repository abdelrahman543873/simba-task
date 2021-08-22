import { Sequelize } from 'sequelize-typescript';
import { Inject, Injectable } from '@nestjs/common';
import { hashPass } from '../shared/utils/bcrypt.util';
import { RegisterInput } from './inputs/user.input';
import { User } from './models/user.model';
import { Transaction } from '../transaction/models/transaction.model';
import { Op } from 'sequelize';
@Injectable()
export class UserRepository {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}
  private readonly Model = User;

  async addUser(user: RegisterInput) {
    return await this.sequelize.transaction(async (transaction) => {
      const userRecord = await this.Model.create(
        {
          ...user,
          password: await hashPass(user.password),
        },
        { transaction },
      );
      await Transaction.create(
        {
          from: null,
          to: userRecord.id,
          currency: 'USD',
          amount: 1000,
        },
        { transaction },
      );
      return userRecord.toJSON();
    });
  }

  async findUserByEmail(email: string) {
    return await this.Model.findOne({
      where: { email: { [Op.iLike]: email } },
      raw: true,
    });
  }

  async findUserById(id: string) {
    return await this.Model.findOne({
      where: { id },
    });
  }

  async userList() {
    return await this.Model.findAll();
  }
}

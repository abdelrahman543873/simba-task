import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { User } from '../user/models/user.model';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionRepository {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}
  private readonly Model = Transaction;

  async sendMoney(
    sender: string,
    receiver: string,
    amount: number,
    convertedAmount: number,
    currency: string,
  ) {
    return await this.sequelize.transaction(async (transaction) => {
      await User.increment('balance', {
        by: amount * -1,
        transaction,
        where: { id: sender },
      });
      await User.increment('balance', {
        by: convertedAmount,
        transaction,
        where: { id: receiver },
      });
      return await this.Model.create(
        {
          to: receiver,
          from: sender,
          currency,
          amount: convertedAmount,
        },
        { transaction },
      );
    });
  }

  async getMyTransactions(id: string) {
    return await this.Model.findAll({
      where: { [Op.or]: [{ from: id }, { to: id }] },
    });
  }
}

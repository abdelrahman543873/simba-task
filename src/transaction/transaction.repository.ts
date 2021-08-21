import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionRepository {
  // constructor(private sequelize: Sequelize) {}
  private readonly Model = Transaction;

  async sendMoney(
    sender: string,
    receiver: string,
    amount: number,
    convertedAmount: number,
    currency: string,
  ) {
    // return await this.sequelize.transaction(async (transaction) => {
    //   await User.increment('balance', {
    //     by: amount * -1,
    //     transaction,
    //     where: { id: sender },
    //   });
    //   await User.increment('balance', {
    //     by: convertedAmount,
    //     transaction,
    //     where: { id: receiver },
    //   });
    //   await this.Model.create(
    //     {
    //       to: receiver,
    //       from: sender,
    //       currency,
    //       amount: convertedAmount,
    //     },
    //     { transaction },
    //   );
    // });
  }
}

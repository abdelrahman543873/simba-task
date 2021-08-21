import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { TransactionInput } from './inputs/transaction.input';
import { TransactionRepository } from './transaction.repository';
import { UserRepository } from '../user/user.repository';
import { LangEnum } from '../shared/app.enum';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';

@Injectable()
export class TransactionService {
  constructor(
    private userRepo: UserRepository,
    private transactionRepo: TransactionRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async sendMoney(input: TransactionInput) {
    const receivingUser = await this.userRepo.findUserByEmail(input.to);
    if (!receivingUser) throw new BaseHttpException(LangEnum.EN, 600);
    const convertedMoney = input.amount * input.exchangeRate;
    if (convertedMoney > this.request.currentUser.balance)
      throw new BaseHttpException(LangEnum.EN, 603);
    return await this.transactionRepo.sendMoney(
      this.request.currentUser.id,
      receivingUser.id,
      input.amount,
      convertedMoney,
      input.targetCurrency,
    );
  }
}

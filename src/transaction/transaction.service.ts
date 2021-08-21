import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { TransactionInput } from './inputs/transaction.input';

@Injectable()
export class TransactionService {
  constructor(@Inject(REQUEST) private readonly request: RequestContext) {}
  async addTransaction(input: TransactionInput) {
    console.log(this.request.currentUser);
  }
}

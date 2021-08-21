import { Injectable } from '@nestjs/common';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionRepository {
  private readonly Model = Transaction;
  async addTransaction(input) {}
}

import { finance } from 'faker';
import { Transaction } from './models/transaction.model';
import { userFactory } from '../user/user.factory';

interface TransactionType {
  from?: string;
  to?: string;
  amount?: number;
  currency?: string;
}

export const buildTransactionParams = async (
  obj?: TransactionType,
): Promise<TransactionType> => {
  return {
    from: obj?.from || (await userFactory()).id,
    to: obj?.to || (await userFactory()).id,
    amount: +obj?.amount || +finance.amount(),
    currency: obj?.currency || finance.currencyCode(),
  };
};

export const transactionsFactory = async (
  count = 10,
  obj: TransactionType,
): Promise<Transaction[]> => {
  const transactions: TransactionType[] = [];
  for (let i = 0; i < count; i++) {
    transactions.push(await buildTransactionParams(obj));
  }
  return await Transaction.bulkCreate(transactions);
};

export const transactionFactory = async (
  obj?: TransactionType,
): Promise<Transaction> => {
  const params: TransactionType = await buildTransactionParams(obj);
  const transaction = await Transaction.create(params);
  return transaction;
};

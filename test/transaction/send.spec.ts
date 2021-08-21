import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams, userFactory } from '../../src/user/user.factory';
import { SEND_TRANSACTION } from '../endpoints/transaction';
import { User } from '../../src/user/models/user.model';
import { Transaction } from '../../src/transaction/models/transaction.model';
describe('send money suite case', () => {
  it('send money successfully', async () => {
    const sender = await userFactory({ balance: 5 });
    const receiver = await userFactory({ balance: 5 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_TRANSACTION,
      token: sender.token,
      variables: {
        to: receiver.email,
        amount: 5,
        exchangeRate: 1,
        targetCurrency: 'USD',
      },
    });
    const receiverUser = await User.findByPk(receiver.id);
    const senderUser = await User.findByPk(sender.id);
    expect(receiverUser.balance).toBe(10);
    expect(senderUser.balance).toBe(0);
    expect(res.body.amount).toBe(5);
    expect(res.body.currency).toBe('USD');
  });

  it('should error if sent money is less than balance', async () => {
    const sender = await userFactory({ balance: 5 });
    const receiver = await userFactory({ balance: 5 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_TRANSACTION,
      token: sender.token,
      variables: {
        to: receiver.email,
        amount: 5,
        exchangeRate: 2,
        targetCurrency: 'NGN',
      },
    });
    expect(res.body.statusCode).toBe(603);
  });

  it("should throw error if receiver doesn't exist", async () => {
    const sender = await userFactory({ balance: 5 });
    const receiverParams = await buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_TRANSACTION,
      token: sender.token,
      variables: {
        to: receiverParams.email,
        amount: 5,
        exchangeRate: 2,
        targetCurrency: 'NGN',
      },
    });
    expect(res.body.statusCode).toBe(600);
  });

  it('should throw error if receiver is Sender', async () => {
    const sender = await userFactory({ balance: 5 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_TRANSACTION,
      token: sender.token,
      variables: {
        to: sender.email,
        amount: 5,
        exchangeRate: 2,
        targetCurrency: 'NGN',
      },
    });
    expect(res.body.statusCode).toBe(605);
  });
});

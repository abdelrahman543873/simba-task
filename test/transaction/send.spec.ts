import { REGISTER } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams, userFactory } from '../../src/user/user.factory';
import { SEND_TRANSACTION } from '../endpoints/transaction';
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
    console.log(res.body);
  });
});

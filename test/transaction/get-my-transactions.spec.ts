import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams, userFactory } from '../../src/user/user.factory';
import { GET_MY_TRANSACTIONS } from '../endpoints/transaction';
import { transactionFactory } from '../../src/transaction/transaction.factory';
describe('get my transactions suite case', () => {
  it('get Transactions successfully', async () => {
    const user = await userFactory();
    await transactionFactory({ from: user.id });
    await transactionFactory({ to: user.id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_TRANSACTIONS,
      token: user.token,
    });
    expect(res.body.length).toBe(2);
  });
});

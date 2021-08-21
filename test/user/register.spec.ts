import { REGISTER } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams } from '../../src/user/user.factory';
import { GET_MY_TRANSACTIONS } from '../endpoints/transaction';
describe('user register suite case', () => {
  it('register user and should have a transaction of 1000 usd', async () => {
    const user = await buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER,
      variables: user,
    });
    expect(res.body.name).toBe(user.name);
    expect(res.body.address).toBe(user.address);
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_TRANSACTIONS,
      token: res.body.token,
    });
    expect(res1.body.length).toBe(1);
  });
});

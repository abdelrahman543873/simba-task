import { REGISTER } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams } from '../../src/user/user.factory';
import { GET_MY_TRANSACTIONS } from '../endpoints/transaction';
import { User } from '../../src/user/models/user.model';
describe('user register suite case', () => {
  it('register user and should have a transaction of 1000 usd and throw an error if user register with the same mail', async () => {
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
    const res2 = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER,
      variables: user,
    });
    expect(res2.body.statusCode).toBe(607);
  });
});

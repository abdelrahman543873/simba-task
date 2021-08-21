import { REGISTER } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams, userFactory } from '../../src/user/user.factory';
import { ADD_TRANSACTION } from '../endpoints/transaction';
describe('user register suite case', () => {
  it('register user', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_TRANSACTION,
      token: user.token,
    });
    // console.log(res.body)
  });
});

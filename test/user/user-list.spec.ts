import { usersFactory } from './../../src/user/user.factory';
import { USERS_LIST } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams } from '../../src/user/user.factory';
import { GET_MY_TRANSACTIONS } from '../endpoints/transaction';
describe('user list suite case', () => {
  it('get user list', async () => {
    const user = await usersFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: USERS_LIST,
      variables: user,
    });
    expect(res.body.length).toBe(10);
  });
});

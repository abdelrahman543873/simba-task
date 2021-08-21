import { REGISTER } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildUserParams } from '../../src/user/user.factory';
describe('user register suite case', () => {
  it('register user', async () => {
    const user = await buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER,
      variables: user,
    });
    expect(res.body.name).toBe(user.name);
    expect(res.body.address).toBe(user.address);
  });
});

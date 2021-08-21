import { REGISTER } from '../endpoints/user';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory, buildUserParams } from '../../src/user/user.factory';
import { AUTH } from '../endpoints/auth';
describe('user login suite case', () => {
  it('login user', async () => {
    const userParams = await buildUserParams();
    const registeredUser = await userFactory(userParams);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: AUTH,
      variables: {
        email: userParams.email,
        password: userParams.password,
      },
    });
    expect(res.body.email).toBe(userParams.email.toLowerCase());
    expect(res.body).toHaveProperty('token');
  });
});

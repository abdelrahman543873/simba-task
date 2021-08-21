describe('login', () => {
  afterEach(async () => {
  });

  it('successful_login', async () => {
    const user = await UserFactory({
      paramsOnly: false,
      obj: { password: 'something' },
    });
    const loginInput = {
      phone: user.phone,
      password: 'something',
      device: 'IOS',
    };
    const res = await post({
      query: LOGIN,
      variables: { loginInput },
    });
    expect(res.body.data.response.code).toBe(200);
  });
});

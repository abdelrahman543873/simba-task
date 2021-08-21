import { address, finance, internet } from 'faker';
import { sign } from 'jsonwebtoken';
import { env } from '../shared/utils/env';
import { hashPass } from '../shared/utils/bcrypt.util';
import { User } from './models/user.model';

interface UserType {
  name?: string;
  email?: string;
  balance?: number;
  address?: string;
  password?: string;
  currency?: string;
}

export const buildUserParams = (obj?: UserType): UserType => {
  return {
    password: obj?.password || internet.password(),
    address: obj?.address || address.streetAddress(),
    name: obj?.name || internet.userName(),
    email: obj?.email || internet.email(),
    balance: obj?.balance || +finance.amount(),
    currency: obj?.currency || finance.currencyCode(),
  };
};

export const usersFactory = async (
  count = 10,
  obj: UserType,
): Promise<User[]> => {
  const users: UserType[] = [];
  for (let i = 0; i < count; i++) {
    users.push(buildUserParams(obj));
  }
  return await User.bulkCreate(users);
};

export const userFactory = async (obj?: UserType): Promise<User> => {
  const params: UserType = buildUserParams(obj);
  const user = await User.create(
    {
      ...params,
      password: await hashPass(params.password),
    },
    { raw: true },
  );
  const token = sign({ userId: user.id }, env.JWT_SECRET);
  user.token = token;
  return user;
};

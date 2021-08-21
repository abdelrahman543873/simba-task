import { address, internet } from 'faker';
import { hashPass } from '../utils/bcrypt.util';
import { User } from './models/user.model';

interface UserType {
  name: string;
  email: string;
  address: string;
  password: string;
}

export const buildUserParams = (obj?: UserType): UserType => {
  return {
    password: obj?.password || internet.password(),
    address: obj?.address || address.streetAddress(),
    name: obj?.name || internet.userName(),
    email: obj?.email || internet.email(),
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
  return User.create({ ...params, password: await hashPass(params.password) });
};

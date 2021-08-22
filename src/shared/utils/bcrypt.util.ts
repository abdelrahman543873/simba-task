import { compare, genSalt, hash } from "bcryptjs";

export const hashPass = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const bcryptCheckPass = async (userPassword, hashedPass) => {
  return await compare(userPassword, hashedPass);
};
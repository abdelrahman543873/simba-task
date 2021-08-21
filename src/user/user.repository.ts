import { Injectable } from '@nestjs/common';
import { hashPass } from '../shared/utils/bcrypt.util';
import { RegisterInput } from './inputs/user.input';
import { User } from './models/user.model';

@Injectable()
export class UserRepository {
  private readonly Model = User;

  async addUser(user: RegisterInput) {
    return await this.Model.create({
      ...user,
      password: await hashPass(user.password),
    });
  }

  async findUserByEmail(email: string) {
    console.log(await this.Model.findAll());
    return await this.Model.findOne({
      where: { email },
      raw: true,
    });
  }

  async findUserById(id: string) {
    return await this.Model.findOne({
      where: { id },
    });
  }
}

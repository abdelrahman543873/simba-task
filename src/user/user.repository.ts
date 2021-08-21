import { Injectable } from '@nestjs/common';
import { hashPass } from 'src/utils/bcrypt.util';
import { RegisterInput } from './inputs/user.input';
import { User } from './models/user.model';

@Injectable()
export class UserRepository {
  private readonly Model = User;

  async addUser(user: RegisterInput) {
    return await this.Model.create({
      ...user,
      password:await hashPass(user.password),
    });
  }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterInput } from './inputs/user.input';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(input: RegisterInput) {
    return await this.userRepo.addUser(input);
  }
}

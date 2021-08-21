import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterInput } from './inputs/user.input';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('user')
  @Post('register')
  async registerUser(@Body() input: RegisterInput) {
    return this.userService.registerUser(input)
  }

}

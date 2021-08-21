import { Body, Controller, Post } from '@nestjs/common';
import { AuthInput } from './inputs/auth.input';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @Post()
  async auth(@Body() input: AuthInput) {
    return await this.authService.login(input);
  }
}

import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthInput {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

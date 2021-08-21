import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email: string;
}

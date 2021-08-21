import { IsNotEmpty, IsEmail, IsString, IsCurrency } from 'class-validator';

export class TransactionInput {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsCurrency()
  currency: string;
}

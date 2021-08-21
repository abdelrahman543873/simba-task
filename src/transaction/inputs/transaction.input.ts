import { Type } from 'class-transformer';
import { IsEmail, IsCurrency, IsNumber } from 'class-validator';

export class TransactionInput {
  @IsEmail()
  to: string;

  @Type(() => Number)
  @IsNumber()
  amount: number;

  @Type(() => Number)
  @IsNumber()
  exchangeRate: number;

  @IsCurrency()
  targetCurrency: string;
}

import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TransactionInput } from './inputs/transaction.input';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('add')
  async addTransaction(input: TransactionInput) {
    return this.transactionService.addTransaction(input);
  }
}

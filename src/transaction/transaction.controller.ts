import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TransactionInput } from './inputs/transaction.input';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiBearerAuth()
  @ApiTags('transaction')
  @UseGuards(AuthGuard)
  @Post('send')
  async sendMoney(@Body() input: TransactionInput) {
    return await this.transactionService.sendMoney(input);
  }
}

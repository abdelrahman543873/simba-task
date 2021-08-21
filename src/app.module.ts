import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { HelperModule } from './shared/helper/helper.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    HelperModule,
    AuthModule,
    TransactionModule,
  ],
})
export class AppModule {}

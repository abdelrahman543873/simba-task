import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { UserModule } from '../../user/user.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}

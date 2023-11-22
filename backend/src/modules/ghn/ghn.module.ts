import { Module } from '@nestjs/common';
import { GHNService } from './ghn.service';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [AddressModule],
  controllers: [],
  providers: [GHNService],
  exports: [GHNService],
})
export class GHNModule {}

import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}

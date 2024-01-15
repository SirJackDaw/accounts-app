import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { MongoModule } from 'libs/common';

@Module({
  imports: [MongoModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}

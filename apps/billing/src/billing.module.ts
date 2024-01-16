import { Module } from '@nestjs/common';
import { BillingHttpController } from './controllers/billingHttp.controller';
import { BillingService } from './billing.service';
import { MongoModule, RmqModule } from 'libs/common';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { BillingMsController } from './controllers/billingMs.controller';
import { PaymentModule } from './payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/billing/.env' }),
    MongoModule,
    AccountModule,
    RmqModule.register('AUTH'),
    RmqModule,
    PaymentModule
  ],
  controllers: [BillingHttpController, BillingMsController],
  providers: [BillingService],
})
export class BillingModule {}

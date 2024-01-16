import { Module } from '@nestjs/common';
import { BillingHttpController } from './controllers/billingHttp.controller';
import { BillingService } from './billing.service';
import { MongoModule, RmqModule } from 'libs/common';
import { BillModule } from './bill/bill.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { BillingWsController } from './controllers/billingWs.controller';
import { PaymentModule } from './payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/billing/.env' }),
    MongoModule,
    AccountModule,
    BillModule,
    RmqModule.register('AUTH'),
    RmqModule,
    PaymentModule
  ],
  controllers: [BillingHttpController, BillingWsController],
  providers: [BillingService],
})
export class BillingModule {}

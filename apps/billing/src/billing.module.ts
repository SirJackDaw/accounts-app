import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { MongoModule } from 'libs/common';
import { BillModule } from './bill/bill.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/billing/.env' }),
    MongoModule,
    AccountModule,
    BillModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}

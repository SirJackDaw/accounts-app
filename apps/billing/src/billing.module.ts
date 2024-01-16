import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { KafkaModule, MongoModule, RmqModule } from 'libs/common';
import { BillModule } from './bill/bill.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/billing/.env' }),
    MongoModule,
    AccountModule,
    BillModule,
    RmqModule.register('AUTH'),
    RmqModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}

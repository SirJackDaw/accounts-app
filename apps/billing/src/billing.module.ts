import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { KafkaModule, MongoModule } from 'libs/common';
import { BillModule } from './bill/bill.module';
import { AccountModule } from './account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/billing/.env' }),
    MongoModule,
    AccountModule,
    BillModule,
    KafkaModule,
    KafkaModule.register('AUTH_SERVICE'),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}

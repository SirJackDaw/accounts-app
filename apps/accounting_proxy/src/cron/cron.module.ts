import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { RmqModule } from 'libs/common';
import { BillModule } from '../bill/bill.module';
import { AccountingEntryModule } from '../accountingEntry/accounting.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RmqModule.register('BILLING'),
    BillModule,
    AccountingEntryModule,
  ],
  providers: [CronService],
})
export class CronModule {}
import { Module } from '@nestjs/common';
import { AccountingEntryService } from './accountingEntry.service';

@Module({
  providers: [AccountingEntryService],
  exports: [AccountingEntryService]
})
export class AccountingEntryModule {}
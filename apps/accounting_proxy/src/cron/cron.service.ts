import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { BillService } from '../bill/bill.service';
import { AccountingEntryService } from '../accountingEntry/accountingEntry.service';
import { Bill } from '../bill/schemas/bill.schema';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly billService: BillService, @Inject('BILLING') private billingClient: ClientProxy, private readonly accEntryService: AccountingEntryService){}

  @Cron('* * * * *')
  async askAccounting() {
    const billsStatusOpen = await this.billService.getOpenedBills('open')

    if (billsStatusOpen.length) {
      billsStatusOpen.forEach(bill => {
        const status = this.accEntryService.getBillStatus(bill)
        if (bill.status !== status) {
          this.billService.updateStatus(bill._id.toHexString(), status)
        }
      })
    }
  }

  async sendEndingDocuments(bill: Bill) {
    const endingDocuments = this.accEntryService.getEndingDocumens(bill)
    this.billService.updateStatus(bill._id.toHexString(), 'closed')

    this.billingClient.send('charge_account', {}).subscribe({
      next: (data) => {
        this.logger.log(data)
      },
      error: (error) => {
        this.logger.error(error)
      }
    })
  }
}
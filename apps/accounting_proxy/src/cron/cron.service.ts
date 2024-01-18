import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { BillService } from '../bill/bill.service';
import { AccountingEntryService } from '../accountingEntry/accountingEntry.service';
import { Bill } from '../bill/schemas/bill.schema';
import { ChargeReqDto } from 'libs/common';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly billService: BillService, @Inject('BILLING') private billingClient: ClientProxy, private readonly accEntryService: AccountingEntryService){}

  @Cron("0 */2 * * * *")
  async askAccounting() {
    const notClosedBills = await this.billService.getNotClosedBills()
    if (notClosedBills.length) {
      notClosedBills.forEach(bill => {
        const accStatus = this.accEntryService.getBillStatus(bill)

        if (accStatus === 'paid') {
          this.chargeWithEndingDocuments(bill)
          return
        }

        if (bill.status !== accStatus) {
          this.billService.updateStatus(bill._id, accStatus)
        }
      })
    }
  }

  async chargeWithEndingDocuments(bill: Bill) {
    const endingDocuments = this.accEntryService.getEndingDocumens(bill)

    if (!endingDocuments) return

    this.billService.addDocuments(bill._id, endingDocuments,'closed')

    const body: ChargeReqDto = {
      accountId: bill.accountId,
      amount: bill.amount,
      endingDocuments,
    }

    this.billingClient.emit('charge_account', body)
  }
}
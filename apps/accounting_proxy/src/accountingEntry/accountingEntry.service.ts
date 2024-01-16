import { Injectable } from '@nestjs/common';
import { Bill } from '../bill/schemas/bill.schema';

@Injectable()
export class AccountingEntryService {
    constructor() {}
    
    getEndingDocumens(bill: Bill) {
        return {
            id: "1",
            date: "2021-07-21T12:00:00.000Z",
            type: "type",
            status: "closed",
            amount: bill.amount,
        }
    }

    getBillStatus(bill: Bill): string {
        if (bill.amount > 100) {
            return 'paid'
        }
    }
}

import { Injectable } from '@nestjs/common';
import { BillRepository } from './bill.repository';
import { Bill } from './schemas/bill.schema';
import { CreateBillDto } from 'libs/common';

@Injectable()
export class BillService {
    constructor(private readonly billRepository: BillRepository) {}

    create(bill: CreateBillDto) {
        return this.billRepository.create({
            ...bill,
            status: 'open',
        })
    }

    getOpenedBills(billStatus: string): Promise<Bill[]> {
        return this.billRepository.find({ status: billStatus })
    }

    updateStatus(id: string, status: string) {
        
    }
}
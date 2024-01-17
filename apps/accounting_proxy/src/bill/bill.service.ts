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

    getNotClosedBills(): Promise<Bill[]> {
        return this.billRepository.find({ status: {$ne: 'closed'} })
    }

    updateStatus(id, status: string) {
        return this.billRepository.findOneAndUpdate({ _id: id }, { status })
    }

    addDocuments(id, documents: any, endingStatus: string) {
        return this.billRepository.findOneAndUpdate({ _id: id }, { status: endingStatus, endingDocuments: documents })
    }
}
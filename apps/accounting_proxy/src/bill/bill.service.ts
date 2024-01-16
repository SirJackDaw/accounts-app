import { Injectable } from '@nestjs/common';
import { BillRepository } from './bill.repository';
import { Bill } from './schemas/bill.schema';
import { CreateBillDto } from './dto/createBill.dto';

@Injectable()
export class BillService {
    constructor(private readonly billRepository: BillRepository) {}

    create(bill: CreateBillDto) {
        return this.billRepository.create({
            ...bill,
            status: 'open',//TODO: enum, status priority
        })
    }

    getBills(accountId: string, userId: string): Promise<Bill[]> {
        return this.billRepository.find({ accountId, userId })//TODO: aggregate
    }

    updateStatus(id: string, status: string) {
        
    }
}
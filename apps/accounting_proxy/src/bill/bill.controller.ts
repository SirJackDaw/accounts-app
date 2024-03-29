import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BillService } from './bill.service';
import { Bill } from './schemas/bill.schema';
import { CreateBillDto } from 'libs/common';


@Controller()
export class BillController {
  constructor(private readonly billService: BillService) {}
  
  @MessagePattern('create_bill')
  createBill(data: CreateBillDto): Promise<Bill> {
    return this.billService.create(data)
  }
}
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/createBill.dto';
import { Bill } from './schemas/bill.schema';

@Controller()
export class BillController {
  constructor(private readonly billService: BillService) {}
  
  @MessagePattern('create_bill')
  createBill(data: CreateBillDto): Promise<Bill> {
    console.log(data)
    return this.billService.create(data)
  }
}
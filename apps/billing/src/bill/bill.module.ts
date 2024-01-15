import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schemas/bill.schema';
import { BillService } from './bill.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }])],
    providers: [BillService],
    exports: [BillService]
})
export class BillModule {}
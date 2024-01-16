import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schemas/bill.schema';
import { BillService } from './bill.service';
import { BillRepository } from './bill.repository';
import { MongoModule } from 'libs/common';
import { BillController } from './bill.controller';

@Module({
    imports: [
        MongoModule,
        MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }])
    ],
    controllers: [BillController],
    providers: [BillService, BillRepository],
    exports: [BillService]
})
export class BillModule {}
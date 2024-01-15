import { Injectable, Logger } from "@nestjs/common"
import { AbstractRepository } from "libs/common"
import { Bill } from "./schemas/bill.schema"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { Connection, Model } from "mongoose"

@Injectable()
export class BillRepository extends AbstractRepository<Bill> {
    protected readonly logger = new Logger(BillRepository.name)
    constructor(@InjectModel(Bill.name) billModel: Model<Bill>, @InjectConnection() connection: Connection) {
        super(billModel, connection)
    }

}
import { ClientProxy } from "@nestjs/microservices";
import { PaymentStrategy } from "./payment.strategy";
import { lastValueFrom } from "rxjs";
import { CreateBillDto } from "libs/common";
import { Account } from "../../account/schemas/account.schema";

export class RequisitesPayment implements PaymentStrategy {
    constructor(private readonly reqClient: ClientProxy) {}

    async init(amount: number, account: Account): Promise<any> {
        console.log('RequisitesPayment')
        const body: CreateBillDto = {
            accountId: account._id.toHexString(),
            amount,
            requisites: account.requisites
        }
        const bill = await lastValueFrom(this.reqClient.send('create_bill', body))
        return bill
    }
}
import { ClientProxy } from "@nestjs/microservices";
import { CreateBillDto } from "libs/common";
import { PaymentStrategy } from "./payment.strategy";
import { Account } from "../../account/schemas/account.schema";
import { lastValueFrom } from "rxjs";

export class RequisitesPayment implements PaymentStrategy {
    constructor(private readonly reqClient: ClientProxy) {}

    async init(amount: number, account: Account): Promise<any> {
        const body: CreateBillDto = {
            accountId: account._id.toHexString(),
            amount,
            requisites: account.requisites
        }
        const bill = this.reqClient.send('create_bill', body);
        const response = await lastValueFrom(bill);

        return response;
    }
}

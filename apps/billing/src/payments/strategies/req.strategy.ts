import { ClientProxy } from "@nestjs/microservices";
import { PaymentStrategy } from "./payment.strategy";

export class RequisitesPayment implements PaymentStrategy {
    constructor(private readonly reqClient: ClientProxy) {}

    async init(amount: number, account: any): Promise<any> {
        console.log('RequisitesPayment')
        return { amount, account };
    }
}
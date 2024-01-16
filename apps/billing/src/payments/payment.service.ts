import { Injectable } from "@nestjs/common";
import { Account } from "../account/schemas/account.schema";
import { PaymentContext } from "./paymentContext";
import { PaymentFactory } from "./paymentFactory";

@Injectable()
export class PaymentService {
    private paymentContext: PaymentContext;
    constructor(private paymentFactory: PaymentFactory) {
        this.paymentContext = new PaymentContext(null)
    }

    async createPayment(paymentMethod: string, amount: number, account: Account) {
        const paymentStrategy = this.paymentFactory.createStrategy(paymentMethod);
        this.paymentContext.setStrategy(paymentStrategy);
        return this.paymentContext.init(amount, account)
    }
}
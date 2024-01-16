import { Account } from "../account/schemas/account.schema";
import { PaymentStrategy } from "./strategies/payment.strategy";

export class PaymentContext {
    paymentStrategy: PaymentStrategy;
    constructor(strategy: PaymentStrategy) {
        this.paymentStrategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy) {
        this.paymentStrategy = strategy;
    }

    async init(amount: number, account: Account) {
        return await this.paymentStrategy.init(amount, account);
    }
}
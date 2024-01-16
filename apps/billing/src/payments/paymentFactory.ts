import { HttpService } from "@nestjs/axios";
import { CreditCardPayment } from "./strategies/creditCard.strategy";
import { PaymentStrategy } from "./strategies/payment.strategy";
import { RequisitesPayment } from "./strategies/req.strategy";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class PaymentFactory {
    constructor(private readonly httpService: HttpService, @Inject('Req') private readonly reqClient: ClientProxy) {}

    private methods: Record<string, PaymentStrategy> = {
        creditCard: new CreditCardPayment(this.httpService),
        requisites: new RequisitesPayment(this.reqClient)
    }

    createStrategy(paymentMethod: string) {
        if (!(paymentMethod in this.methods)) {
            throw new Error('Payment method is not supported');
        }

        return this.methods[paymentMethod];
    }
}
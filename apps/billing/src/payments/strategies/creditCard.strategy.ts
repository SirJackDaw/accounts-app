import { Account } from './../../account/schemas/account.schema';
import { HttpService } from "@nestjs/axios";
import { PaymentStrategy } from "./payment.strategy";
import { lastValueFrom } from 'rxjs';

export class CreditCardPayment implements PaymentStrategy {
    httpService: HttpService;
    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    async init(amount: number, account: Account): Promise<any> {
        const users = await lastValueFrom(this.httpService.get('https://jsonplaceholder.typicode.com/users'));
        console.log('CreditCardPayment', users)
        return { amount, account };
    }
}
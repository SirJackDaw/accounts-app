import { Account } from './../../account/schemas/account.schema';
import { HttpService } from "@nestjs/axios";
import { PaymentStrategy } from "./payment.strategy";
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../../account/account.service';

export class CreditCardPayment implements PaymentStrategy {
    httpService: HttpService;
    accService: AccountService
    constructor(httpService: HttpService, accService: AccountService) {
        this.httpService = httpService;
        this.accService = accService
    }

    async init(amount: number, account: Account): Promise<any> {
        await lastValueFrom(this.httpService.get('https://jsonplaceholder.typicode.com/users'));
        this.accService.charge(account._id.toHexString(), amount)
        return { amount, account };
    }
}
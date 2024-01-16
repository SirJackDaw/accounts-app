import { Injectable, Logger } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { Account } from './account/schemas/account.schema';
import { CreateAccountDto } from 'libs/common';
import { PaymentService } from './payments/payment.service';

@Injectable()
export class BillingService {
  protected readonly logger = new Logger(BillingService.name)
  constructor(private readonly accountService: AccountService, private readonly paymentService: PaymentService) {}

  getAccounts(userId: string) {
    return this.accountService.getAccounts(userId)
  }

  createAccount(dto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(dto);
  }

  withdrawAccount(userId: string, accountId: string, amount: number) {
    return this.accountService.withdraw(userId, accountId, amount);
  }

  async chargeAccount(userId: string, accountId: string, paymentMethod: string, amount: number) {
    const account = await this.accountService.getAccount(accountId, userId)
    if (!account) return

    return this.paymentService.createPayment(paymentMethod, amount, account)
  }
}

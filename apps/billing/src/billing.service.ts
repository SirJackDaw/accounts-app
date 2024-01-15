import { Injectable, Logger } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { CreateAccountDto } from './account/dto/createAccount.dto';
import { Account } from './account/schemas/account.schema';

@Injectable()
export class BillingService {
  protected readonly logger = new Logger(BillingService.name)
  constructor(private readonly accountService: AccountService) {}

  getAccounts(userId: string) {
    return this.accountService.getAccounts(userId)
  }

  createAccount(dto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(dto);
  }

  withdrawAccount(userId: string, accountId: string, amount: number) {
    return this.accountService.withdraw(userId, accountId, amount);
  }

  chargeAccount(accountId: string, paymentMethod: string, amount: number) {

  }
}

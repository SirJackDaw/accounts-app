import { Controller } from '@nestjs/common';
import { BillingService } from '../billing.service';
import { CreateAccountDto } from 'libs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BillingWsController {
  constructor(private readonly billingService: BillingService) {}

  @EventPattern('create_account')
  createAccountMs(data: CreateAccountDto) {
    if (!data.userId) console.log('no user')
    return this.billingService.createAccount(data);
  }

  @EventPattern('withdraw_account')
  withdrawAccountMs(data) {
    console.log(data)
    return this.billingService.withdrawAccount('', '', 0);
  }
}
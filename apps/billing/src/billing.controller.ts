import { Controller, Get, Post } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  getAccounts() {
    return this.billingService.getAccounts();
  }

  @Get()
  getAccount() {
    return this.billingService.getAccounts();
  }

  @Post()
  createAccount() {
    return this.billingService.createAccount();
  }

  @Get()
  withdrawAccount() {
    return this.billingService.withdrawAccount();
  }
}

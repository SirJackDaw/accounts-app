import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }
}

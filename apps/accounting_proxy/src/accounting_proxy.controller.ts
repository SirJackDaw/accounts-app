import { Controller, Get } from '@nestjs/common';
import { AccountingProxyService } from './accounting_proxy.service';

@Controller()
export class AccountingProxyController {
  constructor(private readonly accountingProxyService: AccountingProxyService) {}

  @Get()
  getHello(): string {
    return this.accountingProxyService.getHello();
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateAccountDto } from './account/dto/createAccount.dto';
import { CurrentUser, JwtPayload } from 'libs/common';

@Controller('v1/billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('accounts')
  getAccounts(@CurrentUser() user: JwtPayload) {
    return this.billingService.getAccounts(user.id);
  }

  @Get('account/:id')
  getAccount(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.getAccounts(user.id);
  }

  @Post('account')
  createAccount(@Body() createAccountDto: CreateAccountDto, @CurrentUser() user: JwtPayload) {
    return this.billingService.createAccount(createAccountDto);
  }

  @Get()
  withdrawAccount(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.withdrawAccount(user.id, accountId, 0);
  }
}

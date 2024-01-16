import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { BillingService } from '../billing.service';
import { AuthGuard, CreateAccountDto, CurrentUser, JwtPayload } from 'libs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('v1/billing')
export class BillingHttpController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(AuthGuard)
  @Get('accounts')
  getAccounts(@CurrentUser() user: JwtPayload) {
    return this.billingService.getAccounts(user.id);
  }

  @UseGuards(AuthGuard)
  @Get('account/:id')
  getAccount(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.getAccounts(user.id);
  }

  @UseGuards(AuthGuard)
  @Post('account')
  createAccount(@Body() createAccountDto: CreateAccountDto, @CurrentUser() user: JwtPayload) {
    return this.billingService.createAccount(createAccountDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  withdrawAccount(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.withdrawAccount(user.id, accountId, 0);
  }

  @EventPattern('create_account')
  createAccountMs(data: CreateAccountDto) {
    console.log(data)
    if (!data.userId) console.log('no user')
    return this.billingService.createAccount(data);
  }

  @EventPattern('charge_account')
  chargeAccountMs() {
    return this.billingService.withdrawAccount('', '', 0);
  }

  @EventPattern('withdraw_account')
  withdrawAccountMs() {
    return this.billingService.withdrawAccount('', '', 0);
  }
}

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
  @Get('account/:id/charge-by-card')
  chargeAccountByCard(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.chargeAccount(user.id, accountId, 'creditCard', 104);
  }
  
  @UseGuards(AuthGuard)
  @Get('account/:id/charge-by-card')
  chargeAccountByReqs(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.chargeAccount(user.id, accountId, 'requisites', 104);
  }

  @UseGuards(AuthGuard)
  @Get('account/:id/withdraw')
  withdrawAccount(@Param('id') accountId: string, @CurrentUser() user: JwtPayload) {
    return this.billingService.withdrawAccount(user.id, accountId, 0);
  }
}

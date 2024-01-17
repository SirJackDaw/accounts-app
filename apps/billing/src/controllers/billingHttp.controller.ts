import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
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
  @Get('account/:id/charge')
  chargeAccount(
    @Param('id') accountId: string, 
    @Query('method') paymentMethod: string, 
    @Query('amount') amount: number, 
    @CurrentUser() user: JwtPayload,
  ) {
    console.log('HEY!')
    return this.billingService.createCharge(user.id, accountId, paymentMethod, amount);
  }

  @UseGuards(AuthGuard)
  @Get('account/:id/withdraw')
  withdrawAccount(@Param('id') accountId: string, @Query('amount') amount: number, @CurrentUser() user: JwtPayload) {
    return this.billingService.withdrawAccount(user.id, accountId, amount);
  }
}

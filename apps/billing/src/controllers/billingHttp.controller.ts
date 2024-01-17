import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BillingService } from '../billing.service';
import { AuthGuard, CreateAccountDto, CurrentUser, JwtPayload } from 'libs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('v1/billing')
export class BillingHttpController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(AuthGuard)
  @Get('account/:id/charge')
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'method', type: String })
  @ApiQuery({ name: 'amount', type: Number })
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
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'amount', type: Number })
  withdrawAccount(@Param('id') accountId: string, @Query('amount') amount: number, @CurrentUser() user: JwtPayload) {
    return this.billingService.withdrawAccount(user.id, accountId, amount);
  }

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
  @ApiBody({ type: CreateAccountDto })
  createAccount(@Body() createAccountDto: CreateAccountDto, @CurrentUser() user: JwtPayload) {
    createAccountDto.userId = user.id;
    return this.billingService.createAccount(createAccountDto);
  }
}

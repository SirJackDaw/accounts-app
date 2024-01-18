import { Controller } from '@nestjs/common';
import { BillingService } from '../billing.service';
import { ChargeReqDto, CreateAccountDto, RmqService } from 'libs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class BillingMsController {
  constructor(private readonly billingService: BillingService, private readonly rmqService: RmqService) {}

  @EventPattern('create_account')
  createAccount(@Payload() data: CreateAccountDto, @Ctx() ctx: RmqContext) {
    if (!data.userId) console.log('no user')
    return this.billingService.createAccount(data)/* .then(() => this.rmqService.ack(ctx)) */;
  }

  @EventPattern('withdraw_account')
  withdrawAccount(data) {
    return this.billingService.withdrawAccount('', '', 0);
  }

  @EventPattern('charge_account')
  chargeAccount(data: ChargeReqDto) {
    return this.billingService.chargeAccountDirect(data.accountId, data.amount);
  }
}
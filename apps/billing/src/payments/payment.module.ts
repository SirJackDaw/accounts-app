import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './paymentFactory';
import { RmqModule } from 'libs/common';

@Module({
    imports: [
        HttpModule,
        RmqModule.register('REQ'),
    ],
    providers: [HttpService, PaymentService, PaymentFactory],
})
export class PaymentModule {}

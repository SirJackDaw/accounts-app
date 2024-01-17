import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './paymentFactory';
import { RmqModule } from 'libs/common';
import { AccountModule } from '../account/account.module';

@Module({
    imports: [
        HttpModule,
        RmqModule.register('REQ'),
        AccountModule
    ],
    providers: [PaymentService, PaymentFactory],
    exports: [PaymentService]
})
export class PaymentModule {}

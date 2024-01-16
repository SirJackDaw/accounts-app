import { Module } from '@nestjs/common';
import { AccountingProxyController } from './accounting_proxy.controller';
import { AccountingProxyService } from './accounting_proxy.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/accounting_proxy/.env' }),
  ],
  controllers: [AccountingProxyController],
  providers: [AccountingProxyService],
})
export class AccountingProxyModule {}

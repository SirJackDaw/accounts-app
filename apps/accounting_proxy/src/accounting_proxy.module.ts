import { Module } from '@nestjs/common';
import { AccountingProxyService } from './accounting_proxy.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/accounting_proxy/.env' }),
  ],
  providers: [AccountingProxyService],
})
export class AccountingProxyModule {}

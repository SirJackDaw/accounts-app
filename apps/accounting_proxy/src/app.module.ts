import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/accounting_proxy/.env' }),
    CronModule,
  ],
})
export class AppModule {}

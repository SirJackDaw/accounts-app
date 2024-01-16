import { NestFactory } from '@nestjs/core';
import { AccountingProxyModule } from './accounting_proxy.module';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AccountingProxyModule);
  const transoprtService = app.get(RmqService)
  app.connectMicroservice(transoprtService.getOption('ACC_PROXY', true))
  await app.startAllMicroservices();
}
bootstrap();

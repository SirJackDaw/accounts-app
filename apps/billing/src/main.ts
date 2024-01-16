import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const transoprtService = app.get(RmqService)
  app.connectMicroservice(transoprtService.getOption('BILLING', true))
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();



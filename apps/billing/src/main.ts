import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { KafkaService } from 'libs/common';

async function bootstrap() {
  // const app = await NestFactory.create(BillingModule);
  // await app.listen(3000);
  const app = await NestFactory.create(BillingModule);
  const transoprtService = app.get<KafkaService>(KafkaService)
  app.connectMicroservice(transoprtService.getOption('BILLING'))
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();



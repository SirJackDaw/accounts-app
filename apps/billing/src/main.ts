import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RmqService } from 'libs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const config = new DocumentBuilder()
    .setTitle('Billing service')
    .setDescription('of account-app monorepo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const transoprtService = app.get(RmqService)
  app.connectMicroservice(transoprtService.getOption('BILLING', true))
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();



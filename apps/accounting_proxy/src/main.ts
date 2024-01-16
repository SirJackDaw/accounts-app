import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const transoprtService = app.get(RmqService)
  app.connectMicroservice(transoprtService.getOption('ACC_PROXY', true))
  await app.startAllMicroservices();
}
bootstrap();

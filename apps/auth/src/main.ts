import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const transoprtService = app.get(RmqService)
  app.connectMicroservice(transoprtService.getOption('AUTH', true))
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

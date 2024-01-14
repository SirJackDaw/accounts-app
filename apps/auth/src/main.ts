import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOption('AUTH', true))
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

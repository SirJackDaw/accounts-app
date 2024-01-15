import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { KafkaService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const transoprtService = app.get<KafkaService>(KafkaService)
  app.connectMicroservice(transoprtService.getOption('AUTH'))
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

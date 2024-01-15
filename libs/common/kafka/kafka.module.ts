import { DynamicModule, Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  providers: [KafkaService],
  exports: [KafkaService]
})
export class KafkaModule {
  static register(name: string): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: configService.get<string>('KAFKA_CLIENT_ID'),
                  brokers: [configService.get<string>('KAFKA_URI')]
                },
                consumer: {
                  groupId: configService.get<string>('KAFKA_CONSUMER_GROUP_ID'),
                }
              }
            }),
            inject: [ConfigService]
          }
        ])
      ],
      exports: [ClientsModule]
    }
  }
}

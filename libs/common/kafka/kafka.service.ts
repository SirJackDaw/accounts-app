import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
    constructor(private readonly configServcie: ConfigService) {}

  getOption(queue: string, noAck = false): KafkaOptions {
    return {
        transport: Transport.KAFKA,
        options: {
            client: {
                // clientId: this.configServcie.get<string>('KAFKA_CLIENT_ID'),
                brokers: [this.configServcie.get<string>('KAFKA_URI')]
            },
            consumer: {
              groupId: queue,
            }
        }
    }
  }
}
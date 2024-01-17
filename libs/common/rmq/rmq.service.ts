import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
    constructor(private readonly configServcie: ConfigService) {}

  getOption(queue: string, noAck = false): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            urls: [this.configServcie.get<string>('RABBIT_MQ_URI')],
            queue: this.configServcie.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
            noAck,
            persistent: true
        }
    }
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    console.log(channel, 'chanel')
    const originalMessage = context.getMessage();
    console.log(originalMessage, 'originalMessage')
    channel.ack(originalMessage);
  }
}
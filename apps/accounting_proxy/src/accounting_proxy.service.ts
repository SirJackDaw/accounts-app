import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountingProxyService {
  getHello(): string {
    return 'Hello World!';
  }
}

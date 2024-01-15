import { Injectable, Logger } from '@nestjs/common';
import { Account } from './schemas/account.schema';
import { AbstractRepository } from 'libs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
    protected readonly logger = new Logger(AccountRepository.name)
    constructor(@InjectModel(Account.name) accountModel: Model<Account>, @InjectConnection() connection: Connection) {
        super(accountModel, connection)
    }

}

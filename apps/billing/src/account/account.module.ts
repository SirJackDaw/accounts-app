import { Module } from '@nestjs/common';
import { AccountService } from './account.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    providers: [AccountService],
    exports: [AccountService]
})
export class AccountModule {}

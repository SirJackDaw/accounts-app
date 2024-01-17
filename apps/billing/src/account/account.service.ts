import { AccessTokenGuard } from './../../../auth/src/guards/accessToken.guard';
import { Injectable, Logger } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from 'libs/common';
import mongoose from 'mongoose';

@Injectable()
export class AccountService {
    protected readonly logger = new Logger(AccountService.name)
    constructor(private readonly accountRepository: AccountRepository) {}

    create(dto: CreateAccountDto) {
        return this.accountRepository.create({ 
            ...dto, 
            balance: 0,
        })
    }

    getAccount(accountId: string, userId: string) {
        return this.accountRepository.findOne({ _id: accountId, userId: userId })
    }

    getAccounts(userId: string) {
        return this.accountRepository.find({ userId })
    }
  
    async withdraw(userId: string, accountId: string, amount: number) {
        const account = await this.accountRepository.findOne({ _id: accountId, userId })

        if (account.balance < amount) {
            this.logger.log(`Account ${accountId} has insufficient funds`)
            return
            //TODO throw error
        }

        return this.accountRepository.findOneAndUpdate({ _id: accountId, userId }, { balance: account.balance - amount }).then(account => {
            this.logger.log(`Account ${accountId}: withdrew ${amount}`)
            return account
        })
    }
  
    charge(accountId: string, amount: number) {
        return this.accountRepository.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(accountId) }, { $inc: { balance: amount }})
    }
    
    // transfer(userId: string, accountIdFrom: string, accountIdTo: string, amount: number) {
        
    // }
}

import { Injectable, Logger } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/createAccount.dto';

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

    getAccounts(userId: string) {
        return this.accountRepository.find({ userId })
    }
  
    async withdraw(userId: string, accountId: string, amount: number) {
        const account = await this.accountRepository.findOne({ id: accountId, userId })

        if (account.balance < amount) {
            this.logger.error(`Account ${accountId} has insufficient funds`)
            return
            //TODO throw error
        }

        return this.accountRepository.findOneAndUpdate({ id: accountId, userId }, { balance: account.balance - amount }).then(account => {
            this.logger.debug(`Account ${accountId}: withdrew ${amount}`)
            return account
        })
    }
  
    deposit(userId: string, accountId: string, amount: number) {
  
    }
    
    transfer(userId: string, accountIdFrom: string, accountIdTo: string, amount: number) {
        
    }
}

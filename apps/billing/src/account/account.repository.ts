import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.service';

@Injectable()
export class AccountService {
    constructor(private readonly accountRepository: AccountRepository) {}

    getAccounts() {
    
    }
  
    createAccount(userId: string) {
        
    }
  
    withdraw() {
  
    }
  
    deposit() {
  
    }
}

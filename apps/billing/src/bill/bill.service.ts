import { Injectable } from '@nestjs/common';
import { BillRepository } from './bill.repository';

@Injectable()
export class BillService {
    constructor(private readonly billRepository: BillRepository) {}

    getAccounts() {
    
    }
  
    createAccount(userId: string) {
        
    }
  
    withdraw() {
  
    }
  
    deposit() {
  
    }
}
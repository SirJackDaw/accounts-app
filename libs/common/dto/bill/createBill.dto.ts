export class CreateBillDto {
    constructor(accountId: string, amount: number, requiesites: any) {
        this.accountId = accountId;
        this.amount = amount;
        this.requisites = requiesites;
    }

    accountId: string;
    amount: number;
    requisites: any;
}
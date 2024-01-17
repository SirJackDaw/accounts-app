export class ChargeReqDto {
    constructor(accountId: string, amount: number, endingDocuments: any) {
        this.accountId = accountId;
        this.amount = amount;
        this.endingDocuments = endingDocuments;
    }

    accountId: string;
    amount: number;
    endingDocuments: any;
}
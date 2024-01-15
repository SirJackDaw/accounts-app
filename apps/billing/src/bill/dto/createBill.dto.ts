import { Account } from "../../account/schemas/account.schema";

export class CreateBillDto {
    account: Account;
    amount: number;
}
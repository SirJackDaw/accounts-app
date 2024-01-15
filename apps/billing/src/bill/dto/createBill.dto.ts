import { Account } from "../../account/schemas/account.schema";
import { Requisites } from "../schemas/bill.schema";

export class CreateBillDto {
    account: Account;
    requisites: Requisites;
    amount: number;
}
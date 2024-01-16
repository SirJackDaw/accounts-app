import { Account } from "../../account/schemas/account.schema";

export interface PaymentStrategy {
    init(amount: number, account: Account): Promise<any>
}
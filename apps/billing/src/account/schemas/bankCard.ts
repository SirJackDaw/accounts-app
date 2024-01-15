import { Prop } from "@nestjs/mongoose";

export class BankCard {
    @Prop()
    cardNumber: Number;

    @Prop()
    cardHolder: string;

    @Prop()
    expirationDate: string;

    @Prop()
    cvv?: Number;
}
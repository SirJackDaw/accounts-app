import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";
import { Requisites } from "./companyRequisites";
import { BankCard } from "./bankCard";

@Schema({ versionKey: false, timestamps: true })
export class Account extends AbstractDocument {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true, default: 'RUB' })
    currency: string;

    @Prop({ type: Number, default: 0 })
    balance: number;

    @Prop({ type: Requisites, required: false })
    requisites?: Requisites;

    @Prop({ type: BankCard, required: false })
    bankCard?: BankCard;
}

export const AccountSchema = SchemaFactory.createForClass(Account)
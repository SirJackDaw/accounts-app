import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";
import { Account } from "../../account/schemas/account.schema";
import { Type } from "class-transformer";
import mongoose from "mongoose";

export class Requisites {
    @Prop()
    inn: string;

    @Prop()
    kpp: string;

    @Prop()
    bik: string;

    @Prop()
    bank: string;
}

@Schema({ versionKey: false, id: true, timestamps: true })
export class Bill extends AbstractDocument {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Account.name })
    @Type(() => Account)
    account: Account;

    @Prop({ type: Requisites, required: true })
    requisites: Requisites;

    @Prop({ type: String, default: 'open' })
    status: string;

    @Prop({ type: Number })
    amount: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

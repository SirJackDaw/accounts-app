import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";

@Schema({ versionKey: false, timestamps: true })
export class Account extends AbstractDocument {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true, default: 'RUB' })
    currency: string;

    @Prop({ type: Number, default: 0 })
    balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account)
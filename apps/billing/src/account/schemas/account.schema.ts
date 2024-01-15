import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";

@Schema({ versionKey: false, id: true })
export class Account extends AbstractDocument {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true, default: 'RUB' })
    currency: string;

    @Prop({ type: Number, default: 0 })
    balance: number;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account)
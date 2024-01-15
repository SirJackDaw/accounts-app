import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";
import { Account } from "../../account/schemas/account.schema";
import { Type } from "class-transformer";
import mongoose from "mongoose";

@Schema({ versionKey: false, id: true })
export class Bill extends AbstractDocument {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Account.name })
    @Type(() => Account)
    account: Account;

    @Prop({ type: String, required: true })
    requesites: string;

    @Prop({ type: String, default: 'open'})
    status: string

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const BillSchema = SchemaFactory.createForClass(Bill)
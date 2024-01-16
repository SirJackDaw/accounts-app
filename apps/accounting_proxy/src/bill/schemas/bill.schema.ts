import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";

@Schema({ versionKey: false, id: true, timestamps: true })
export class Bill extends AbstractDocument {
    @Prop({ type: Number, required: true})
    accountId: Number;

    @Prop({ type: String, default: 'open' })
    status: string;

    @Prop({ type: Number })
    amount: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

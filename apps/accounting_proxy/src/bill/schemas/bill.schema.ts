import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";
import mongoose from "mongoose";

@Schema({ versionKey: false, id: true, timestamps: true })
export class Bill extends AbstractDocument {
    @Prop({ type: String, required: true})
    accountId: string;

    @Prop({ type: String, default: 'open' })
    status: string;

    @Prop({ type: Number })
    amount: number;

    @Prop({type: mongoose.Schema.Types.Mixed})
    requiesites?: any;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

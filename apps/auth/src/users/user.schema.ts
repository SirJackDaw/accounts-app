import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { AbstractDocument } from "libs/common";

@Schema({ versionKey: false, id: true })
export class User extends AbstractDocument {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Exclude()
    @Prop({ type: String, required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
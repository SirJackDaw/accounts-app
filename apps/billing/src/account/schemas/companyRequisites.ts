import { Prop } from "@nestjs/mongoose";

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
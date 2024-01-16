import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRequisitesDto {
    @IsString()
    @IsNotEmpty()
    inn: string;

    @IsString()
    @IsNotEmpty()
    kpp: string;

    @IsString()
    @IsNotEmpty()
    bik: string;

    @IsNumber()
    @IsNotEmpty()
    bank: Number;
}
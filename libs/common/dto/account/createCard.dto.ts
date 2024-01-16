import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBankCardDto {
    @IsNumber()
    @IsNotEmpty()
    cardNumber: Number;

    @IsString()
    @IsNotEmpty()
    cardHolder: string;

    @IsString()
    @IsOptional()
    cvv?: Number;

    @IsString()
    @IsNotEmpty()
    expirationDate: string;
}
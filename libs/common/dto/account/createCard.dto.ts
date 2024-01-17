import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBankCardDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    cardNumber: Number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    cardHolder: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    cvv?: Number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    expirationDate: string;
}
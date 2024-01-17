import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRequisitesDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    inn: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    kpp: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    bik: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    bank: Number;
}
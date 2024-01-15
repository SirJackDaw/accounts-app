import { IsString, IsNotEmpty } from "class-validator";

export class CreateAccountDto {
    userId: string

    @IsString()
    @IsNotEmpty()
    currency: string;
}
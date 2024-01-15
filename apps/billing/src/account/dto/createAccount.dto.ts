import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { CreateBankCardDto } from "./createCard.dto";
import { CreateRequisitesDto } from "./createReq.dto";

export class CreateAccountDto {
    userId: string

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsOptional()
    bankCard?: CreateBankCardDto;

    @IsOptional()
    requsites?: CreateRequisitesDto;
}
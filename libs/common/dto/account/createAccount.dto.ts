import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { CreateBankCardDto } from "./createCard.dto";
import { CreateRequisitesDto } from "./createReq.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
    constructor(userId: string, currency: string, bankCard?: CreateBankCardDto, requisites?: CreateRequisitesDto) {
        this.userId = userId;
        this.currency = currency;
        this.bankCard = bankCard;
        this.requisites = requisites;
    }
    
    userId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    currency: string;

    @IsOptional()
    @ApiProperty({type: CreateBankCardDto})
    bankCard?: CreateBankCardDto;

    @IsOptional()
    @ApiProperty({type: CreateRequisitesDto})
    requisites?: CreateRequisitesDto;

    toString() {
        return JSON.stringify({
            userId: this.userId,
            currency: this.currency,
            bankCard: this.bankCard,
            requisites: this.requisites
        });
    }
}
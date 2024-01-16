import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { CreateBankCardDto } from "./createCard.dto";
import { CreateRequisitesDto } from "./createReq.dto";

export class CreateAccountDto {
    constructor(userId: string, currency: string, bankCard?: CreateBankCardDto, requsites?: CreateRequisitesDto) {
        this.userId = userId;
        this.currency = currency;
        this.bankCard = bankCard;
        this.requsites = requsites;
    }
    
    userId: string

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsOptional()
    bankCard?: CreateBankCardDto;

    @IsOptional()
    requsites?: CreateRequisitesDto;

    toString() {
        return JSON.stringify({
            userId: this.userId,
            currency: this.currency,
            bankCard: this.bankCard,
            requsites: this.requsites
        });
    }
}
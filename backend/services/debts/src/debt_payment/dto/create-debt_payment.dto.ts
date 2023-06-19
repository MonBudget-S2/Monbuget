import {IsDate, IsNumber, IsString} from "class-validator";

export class CreateDebtPaymentDto {

    @IsNumber()
    amount: number;

    @IsDate()
    date: Date;

    @IsString()
    debtId: string;
}

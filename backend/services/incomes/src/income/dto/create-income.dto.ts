import {IsDate, IsNumber, IsString} from "class-validator";

export class CreateIncomeDto {
    @IsString()
    type: string

    @IsNumber()
    amount: string

    @IsString()
    userId: string

    @IsDate()
    date: Date

}

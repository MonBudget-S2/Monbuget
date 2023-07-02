import {IsDate, IsNumber, IsString} from "class-validator";

export class CreateDebtDto {
    @IsString()
    type: string

    @IsNumber()
    amount: number

    @IsString()
    userId: string

    @IsDate()
    date: Date

}


export class UpdateDebtDto{
    @IsString()
    type?: string

    @IsNumber()
    amount?: number

    @IsString()
    userId?: string

    @IsDate()
    date?: Date

}
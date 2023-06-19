import {IsDate, IsNumber, IsString} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

export class CreateIncomeDto {
    @IsString()
    type: string

    @IsNumber()
    amount: number

    @IsString()
    userId: string

    @IsDate()
    date: Date

}


export class UpdateIncomeDto{
    @IsString()
    type?: string

    @IsNumber()
    amount?: number

    @IsString()
    userId?: string

    @IsDate()
    date?: Date

}
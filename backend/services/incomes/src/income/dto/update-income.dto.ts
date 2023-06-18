import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDto } from './create-income.dto';
import {IsDate, IsNumber, IsString} from "class-validator";

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {
    @IsString()
    type: string

    @IsNumber()
    amount: string

    @IsString()
    userId: string

    @IsDate()
    date: Date

}

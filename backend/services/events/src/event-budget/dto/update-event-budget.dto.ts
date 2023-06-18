import { PartialType } from '@nestjs/mapped-types';
import { CreateEventBudgetDto } from './create-event-budget.dto';
import {IsDate, IsNumber, IsString} from "class-validator";

export class UpdateEventBudgetDto extends PartialType(CreateEventBudgetDto) {
    @IsString()
    name: string

    @IsNumber()
    amount: number;

    @IsDate()
    startDate: Date

    @IsDate()
    endDate: Date

    @IsString()
    userId: string
}

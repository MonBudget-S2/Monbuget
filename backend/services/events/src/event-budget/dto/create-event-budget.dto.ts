import {IsDate, IsNumber, IsString} from "class-validator";

export class CreateEventBudgetDto {
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

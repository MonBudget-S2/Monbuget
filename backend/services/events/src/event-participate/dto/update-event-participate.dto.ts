import { PartialType } from '@nestjs/mapped-types';
import { CreateEventParticipateDto } from './create-event-participate.dto';
import {IsNumber, IsString} from "class-validator";

export class UpdateEventParticipateDto extends PartialType(CreateEventParticipateDto) {
    @IsNumber()
    amountPaid: number

    @IsString()
    userId: string;

    @IsString()
    eventBudgetId: string;
}

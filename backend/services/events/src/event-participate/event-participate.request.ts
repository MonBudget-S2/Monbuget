import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateEventParticipateDto {
  @IsNumber()
  amountPaid: number;

  @IsString()
  userId: string;

  @IsString()
  eventBudgetId: string;
}

export class UpdateEventParticipateDto extends PartialType(
  CreateEventParticipateDto,
) {
  @IsNumber()
  amountPaid: number;

  @IsString()
  userId: string;

  @IsString()
  eventBudgetId: string;
}

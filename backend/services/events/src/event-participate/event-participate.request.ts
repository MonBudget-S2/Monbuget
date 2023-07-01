import { IsNumber, IsString } from 'class-validator';

export class CreateEventParticipateDto {
  @IsNumber()
  amountPaid: number;

  @IsString()
  userId: string;

  @IsString()
  eventBudgetId: string;
}

export class UpdateEventParticipateDto {
  @IsNumber()
  amountPaid: number;

  @IsString()
  userId: string;

  @IsString()
  eventBudgetId: string;
}

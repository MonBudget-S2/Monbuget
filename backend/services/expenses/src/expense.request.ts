import { IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  location?: string;

  @IsString()
  receiptImage?: string;

  @IsString()
  userId?: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  eventBudgetId?: number;
}

export class UpdateExpenseDto {
  @IsString()
  description?: string;

  @IsNumber()
  amount?: number;

  @IsDate()
  date?: Date;

  @IsString()
  location?: string;

  @IsString()
  receiptImage?: string;

  @IsString()
  userId?: string;

  @IsNumber()
  categoryId?: number;

  @IsNumber()
  eventBudgetId?: number;
}

import { IsString, IsNumber, IsDate, IsBoolean, IsUUID } from "class-validator";

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

  @IsUUID()
  userId?: string;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  eventBudgetId?: string;
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

  @IsUUID()
  userId?: string;

  @IsUUID()
  categoryId?: string;

  @IsUUID()
  eventBudgetId?: string;
}

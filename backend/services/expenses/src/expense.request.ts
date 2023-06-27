import { IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  paymentMethod: string;

  @IsString()
  location: string;

  @IsString()
  receiptImage: string;

  @IsBoolean()
  isPersonal: boolean;

  @IsString()
  userId: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  eventBudgetId: number;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @IsString()
  description?: string;

  @IsNumber()
  amount?: number;

  @IsDate()
  date?: Date;

  @IsString()
  paymentMethod?: string;

  @IsString()
  location?: string;

  @IsString()
  receiptImage?: string;

  @IsBoolean()
  isPersonal?: boolean;

  @IsString()
  userId?: string;

  @IsNumber()
  categoryId?: number;

  @IsNumber()
  eventBudgetId?: number;
}

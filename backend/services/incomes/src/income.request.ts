import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { IncomeType } from './income.enum';

export class CreateIncomeDto {
  @IsEnum(IncomeType)
  type: IncomeType;

  @IsNumber()
  amount: number;

  @IsString()
  userId: string;

  @IsDate()
  date: Date;
}

export class UpdateIncomeDto {
  @IsEnum(IncomeType)
  type?: IncomeType;

  @IsNumber()
  amount?: number;

  @IsString()
  userId?: string;

  @IsDate()
  date?: Date;
}

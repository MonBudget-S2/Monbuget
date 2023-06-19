import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsString()
  userId: string;

  @IsDate()
  date: Date;
}

export class UpdateIncomeDto {
  @IsString()
  type?: string;

  @IsNumber()
  amount?: number;

  @IsString()
  userId?: string;

  @IsDate()
  date?: Date;
}

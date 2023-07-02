import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsString()
  motif: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  remainingAmount: number;

  @IsDate()
  dueDate: Date;

  @IsString()
  debtType: string;
}

export class UpdateDebtDto {
  @IsString()
  motif: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  remainingAmount: number;

  @IsDate()
  dueDate: Date;

  @IsString()
  debtType: string;
}

export class CreateDebtPaymentDto {
  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  debtId: string;
}

export class UpdateDebtPaymentDto {
  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  debtId: string;
}

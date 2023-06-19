import { PartialType } from '@nestjs/mapped-types';
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

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
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

import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDebtPaymentDto {

  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  debtId: string;
}

export class UpdateDebtPaymentDto extends PartialType(CreateDebtPaymentDto) {
  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  debtId: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtPaymentDto } from './create-debt_payment.dto';
import {IsDate, IsNumber, IsString} from "class-validator";

export class UpdateDebtPaymentDto extends PartialType(CreateDebtPaymentDto) {

    @IsNumber()
    amount: number;

    @IsDate()
    date: Date;

    @IsString()
    debtId: string;
}

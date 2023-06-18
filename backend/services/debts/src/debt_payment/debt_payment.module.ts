import { Module } from '@nestjs/common';
import { DebtPaymentService } from './debt_payment.service';
import { DebtPaymentController } from './debt_payment.controller';

@Module({
  controllers: [DebtPaymentController],
  providers: [DebtPaymentService]
})
export class DebtPaymentModule {}

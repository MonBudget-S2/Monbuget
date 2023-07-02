import { Module } from '@nestjs/common';
import { DebtPaymentService } from './debt_payment.service';
import { DebtPaymentController } from './debt_payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtPayment } from './debt_payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtPayment])],
  controllers: [DebtPaymentController],
  providers: [DebtPaymentService],
})
export class DebtPaymentModule {}

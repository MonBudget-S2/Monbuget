import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { DebtPaymentModule } from 'src/debt_payment/debt_payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './debt.entity';

@Module({
  imports: [DebtPaymentModule, TypeOrmModule.forFeature([Debt])],
  controllers: [DebtController],
  providers: [DebtService],
})
export class DebtModule {}

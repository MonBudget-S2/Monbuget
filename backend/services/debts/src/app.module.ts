import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DebtModule } from './debt/debt.module';
import { DebtPaymentModule } from './debt_payment/debt_payment.module';

@Module({
  imports: [DebtModule, DebtPaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

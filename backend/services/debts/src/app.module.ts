import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DebtModule } from './debt/debt.module';
import { DebtPaymentModule } from './debt_payment/debt_payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { Debt } from './debt/entities/debt.entity';
import { DebtPayment } from './debt_payment/entities/debt_payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Debt, DebtPayment]),
    DebtModule,
    DebtPaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

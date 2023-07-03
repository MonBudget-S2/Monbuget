import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { Debt } from './debt.entity';
import { DebtPayment } from './debt_payment.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Debt, DebtPayment]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

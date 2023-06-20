import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Expense } from './expense.entity';
import config from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Expense])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

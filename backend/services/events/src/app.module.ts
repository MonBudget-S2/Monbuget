import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBudgetModule } from './event-budget/event-budget.module';
import { EventParticipateModule } from './event-participate/event-participate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { EventBudget } from './event-budget/entities/event-budget.entity';
import { EventParticipate } from './event-participate/entities/event-participate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([EventBudget, EventParticipate]),
    EventBudgetModule,
    EventParticipateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

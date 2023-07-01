import { Module } from '@nestjs/common';
import { EventBudgetService } from './event-budget.service';
import { EventBudgetController } from './event-budget.controller';
import { EventParticipateModule } from '../event-participate/event-participate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBudget } from './event-budget.entity';
import { EventParticipateService } from 'src/event-participate/event-participate.service';

@Module({
  imports: [EventParticipateModule, TypeOrmModule.forFeature([EventBudget])],
  controllers: [EventBudgetController],
  providers: [EventBudgetService],
})
export class EventBudgetModule {}

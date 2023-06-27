import { Module } from '@nestjs/common';
import { EventBudgetService } from './event-budget.service';
import { EventBudgetController } from './event-budget.controller';

@Module({
  controllers: [EventBudgetController],
  providers: [EventBudgetService]
})
export class EventBudgetModule {}

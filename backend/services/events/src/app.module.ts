import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBudgetModule } from './event-budget/event-budget.module';
import { EventParticipateModule } from './event-participate/event-participate.module';

@Module({
  imports: [EventBudgetModule, EventParticipateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

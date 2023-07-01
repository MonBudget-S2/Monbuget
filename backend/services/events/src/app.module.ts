import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBudgetModule } from './event-budget/event-budget.module';
import { EventParticipateModule } from './event-participate/event-participate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { EventBudget } from './event-budget/event-budget.entity';
import { EventParticipate } from './event-participate/event-participate.entity';
import { EventInvitationModule } from './event-invitation/event-invitation.module';
import { EventInvitation } from './event-invitation/event-invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([EventBudget, EventParticipate, EventInvitation]),
    EventBudgetModule,
    EventParticipateModule,
    EventInvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

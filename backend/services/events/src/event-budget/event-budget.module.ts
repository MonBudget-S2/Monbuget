import { Module } from '@nestjs/common';
import { EventBudgetService } from './event-budget.service';
import { EventBudgetController } from './event-budget.controller';
import { EventParticipateModule } from '../event-participate/event-participate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBudget } from './event-budget.entity';
import { EventParticipateService } from 'src/event-participate/event-participate.service';
import { EventInvitationModule } from 'src/event-invitation/event-invitation.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    EventInvitationModule,
    EventParticipateModule,
    TypeOrmModule.forFeature([EventBudget]),
    ClientsModule.register([
      {
        name: 'EXPENSE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'challenge-expenses-service',
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [EventBudgetController],
  providers: [EventBudgetService],
})
export class EventBudgetModule {}

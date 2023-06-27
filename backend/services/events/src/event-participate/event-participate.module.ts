import { Module } from '@nestjs/common';
import { EventParticipateService } from './event-participate.service';
import { EventParticipateController } from './event-participate.controller';

@Module({
  controllers: [EventParticipateController],
  providers: [EventParticipateService]
})
export class EventParticipateModule {}

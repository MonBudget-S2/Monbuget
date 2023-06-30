import { Module } from '@nestjs/common';
import { EventParticipateService } from './event-participate.service';
import { EventParticipateController } from './event-participate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventParticipate } from './event-participate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventParticipate])],
  controllers: [EventParticipateController],
  providers: [EventParticipateService],
  exports: [EventParticipateService],
})
export class EventParticipateModule {}

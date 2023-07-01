import { Module } from '@nestjs/common';
import { EventInvitationController } from './event-invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventInvitation } from './event-invitation.entity';
import { EventInvitationService } from './event-invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventInvitation])],
  controllers: [EventInvitationController],
  providers: [EventInvitationService],
  exports: [EventInvitationService],
})
export class EventInvitationModule {}

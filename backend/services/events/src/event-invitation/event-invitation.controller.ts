import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventInvitationService } from './event-invitation.service';
import { InvitationStatus } from './event-invitation.enum';

@Controller('event-invitations')
export class EventInvitationController {
  constructor(
    private readonly eventInvitationService: EventInvitationService,
  ) {}

  @MessagePattern({ service: 'eventInvitation', action: 'create' })
  createEventInvitation(payload: { eventId: string; userId: string }) {
    const { userId, eventId } = payload;
    return this.eventInvitationService.create(userId, eventId);
  }

  @MessagePattern({ service: 'eventInvitation', action: 'getAll' })
  getAllEventInvitations() {
    return this.eventInvitationService.getAll();
  }

  @MessagePattern({ service: 'eventInvitation', action: 'getById' })
  getEventInvitationById(id: string) {
    return this.eventInvitationService.getById(id);
  }

  @MessagePattern({
    service: 'eventInvitation',
    action: 'update',
  })
  updateEventInvitation(
    @Payload() payload: { id: string; status: InvitationStatus },
  ) {
    const { id, status } = payload;

    return this.eventInvitationService.update(id, status);
  }

  @MessagePattern({ service: 'eventInvitation', action: 'delete' })
  deleteEventInvitation(id: string) {
    return this.eventInvitationService.delete(id);
  }

  @MessagePattern({ service: 'eventInvitation', action: 'getByEventId' })
  getByEventId(eventId: string) {
    return this.eventInvitationService.getByEventId(eventId);
  }
}

import { Controller } from '@nestjs/common';
import { EventParticipateService } from './event-participate.service';
import { CreateEventParticipateDto } from './event-participate.request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateEventParticipateDto } from './event-participate.request';

@Controller()
export class EventParticipateController {
  constructor(
    private readonly eventParticipateService: EventParticipateService,
  ) {}

  @MessagePattern({ service: 'eventParticipate', action: 'create' })
  createEventParticipate(createEventParticipateDto: CreateEventParticipateDto) {
    return this.eventParticipateService.create(createEventParticipateDto);
  }

  @MessagePattern({ service: 'eventParticipate', action: 'getAll' })
  getAllEventParticipates() {
    return this.eventParticipateService.getAll();
  }

  @MessagePattern({ service: 'eventParticipate', action: 'getAllByUser' })
  getAllEventParticipatesByUser(userId: string) {
    return this.eventParticipateService.getAllByUser(userId);
  }

  @MessagePattern({ service: 'eventParticipate', action: 'getById' })
  getEventParticipateById(id: string) {
    return this.eventParticipateService.getById(id);
  }

  @MessagePattern({ service: 'eventParticipate', action: 'getByEventAndUser' })
  getEventParticipateByEventAndUser(
    @Payload()
    payload: {
      eventId: string;
      userId: string;
    },
  ) {
    const { eventId, userId } = payload;
    return this.eventParticipateService.getByEventAndUser(eventId, userId);
  }

  @MessagePattern({ service: 'eventParticipate', action: 'update' })
  updateEventParticipate(
    @Payload()
    payload: {
      id: string;
      updateEventParticipateDto: UpdateEventParticipateDto;
    },
  ) {
    console.log('payload', payload);
    const { id, updateEventParticipateDto } = payload;
    return this.eventParticipateService.update(id, updateEventParticipateDto);
  }

  @MessagePattern({ service: 'eventParticipate', action: 'delete' })
  deleteEventParticipate(id: string) {
    return this.eventParticipateService.delete(id);
  }
}

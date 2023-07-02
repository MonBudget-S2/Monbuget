import { Controller } from '@nestjs/common';
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from './event-budget.request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  EventBudgetResponse,
  EventBudgetService,
} from './event-budget.service';
import { InvitationStatus } from 'src/event-invitation/event-invitation.enum';

@Controller()
export class EventBudgetController {
  constructor(private readonly appService: EventBudgetService) {}

  @MessagePattern({ service: 'eventBudget', action: 'create' })
  createEventBudget(createEventBudgetDto: CreateEventBudgetDto) {
    return this.appService.create(createEventBudgetDto);
  }

  @MessagePattern({ service: 'eventBudget', action: 'getAll' })
  getAllEventBudgets(): Promise<EventBudgetResponse[]> {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'eventBudget', action: 'getAllByUser' })
  getAllEventBudgetsByUser(userId: string): Promise<EventBudgetResponse[]> {
    return this.appService.getAllByUser(userId);
  }

  @MessagePattern({ service: 'eventBudget', action: 'getById' })
  getEventBudgetById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'eventBudget', action: 'update' })
  updateEventBudget(
    @Payload()
    payload: {
      id: string;
      updateEventBudgetDto: UpdateEventBudgetDto;
    },
  ) {
    const { id, updateEventBudgetDto } = payload;
    return this.appService.update(id, updateEventBudgetDto);
  }

  @MessagePattern({ service: 'eventBudget', action: 'delete' })
  deleteEventBudget(id: string) {
    return this.appService.delete(id);
  }

  @MessagePattern({ service: 'eventBudget', action: 'createInvitation' })
  createInvitation(
    @Payload()
    payload: {
      eventId: string;
      userId: string;
    },
  ) {
    const { eventId, userId } = payload;
    return this.appService.createInvitation(eventId, userId);
  }

  @MessagePattern({ service: 'eventBudget', action: 'updateInvitationStatus' })
  updateInvitationStatus(
    @Payload()
    payload: {
      invitationId: string;
      status: InvitationStatus;
    },
  ) {
    const { invitationId, status } = payload;
    return this.appService.updateInvitationStatus(invitationId, status);
  }
}

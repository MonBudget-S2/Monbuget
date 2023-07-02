import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventBudget } from './event-budget.entity';
import { Repository } from 'typeorm';
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from './event-budget.request';
import { EventParticipate } from 'src/event-participate/event-participate.entity';
import { EventParticipateService } from 'src/event-participate/event-participate.service';
import { EventInvitationService } from 'src/event-invitation/event-invitation.service';
import { EventInvitation } from 'src/event-invitation/event-invitation.entity';
import { InvitationStatus } from 'src/event-invitation/event-invitation.enum';
import { ClientProxy } from '@nestjs/microservices';

export interface EventBudgetResponse extends EventBudget {
  eventParticipants: EventParticipate[];
}

@Injectable()
export class EventBudgetService {
  constructor(
    @Inject('EXPENSE_SERVICE') private readonly expenseService: ClientProxy,

    @InjectRepository(EventBudget)
    private eventBudgetRepository: Repository<EventBudget>,
    private readonly eventParticipateService: EventParticipateService,
    private readonly eventInvitationService: EventInvitationService,
  ) {}

  async create(createEventBudgetDto: CreateEventBudgetDto): Promise<any> {
    console.log('createEventBudgetDto', createEventBudgetDto);
    const newEventBudget =
      this.eventBudgetRepository.create(createEventBudgetDto);
    await this.eventBudgetRepository.save(newEventBudget);

    // Create EventParticipate entity and associate it with the user
    const eventParticipate = new EventParticipate();
    eventParticipate.userId = createEventBudgetDto.userId;
    eventParticipate.eventBudgetId = newEventBudget.id;
    await this.eventParticipateService.create(eventParticipate);

    return { message: 'Event budget created successfully', newEventBudget };
  }

  async getById(id: string): Promise<EventBudgetResponse | null> {
    const eventBudget = await this.eventBudgetRepository.findOneBy({ id });
    if (!eventBudget) {
      return null;
    }
    const eventParticipants =
      await this.eventParticipateService.getByEventBudgetId(id);

    const eventBudgetResponse: EventBudgetResponse = {
      ...eventBudget,
      eventParticipants,
    };

    return eventBudgetResponse;
  }

  async getAll(): Promise<EventBudgetResponse[]> {
    const eventBudgets = await this.eventBudgetRepository.find();
    const eventBudgetsResponse: EventBudgetResponse[] = [];

    for (const eventBudget of eventBudgets) {
      const eventParticipants =
        await this.eventParticipateService.getByEventBudgetId(eventBudget.id);

      eventBudgetsResponse.push({
        ...eventBudget,
        eventParticipants,
      });
    }

    return eventBudgetsResponse;
  }

  async getAllByUser(userId: string): Promise<EventBudgetResponse[]> {
    const eventBudgets = await this.eventBudgetRepository.find({
      where: { userId },
    });
    const eventBudgetsResponse: EventBudgetResponse[] = [];

    for (const eventBudget of eventBudgets) {
      const eventParticipants =
        await this.eventParticipateService.getByEventBudgetId(eventBudget.id);
      eventBudgetsResponse.push({
        ...eventBudget,
        eventParticipants,
      });
    }

    return eventBudgetsResponse;
  }

  async update(
    id: string,
    updateEventBudgetDto: UpdateEventBudgetDto,
  ): Promise<EventBudget | null> {
    const eventBudget = await this.eventBudgetRepository.findOneBy({ id });
    if (!eventBudget) {
      return null; // Event budget with the given ID not found
    }

    const updatedEventBudget = await this.eventBudgetRepository.save({
      ...eventBudget,
      ...updateEventBudgetDto,
    });

    return updatedEventBudget;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.eventBudgetRepository.delete(id);
    return result.affected > 0;
  }

  async createInvitation(
    eventId: string,
    userId: string,
  ): Promise<EventInvitation | null> {
    const eventBudget = await this.eventBudgetRepository.findOneBy({
      id: eventId,
    });
    if (!eventBudget) {
      throw new NotFoundException('Event budget not found');
    }

    const eventParticipate =
      await this.eventParticipateService.getByEventBudgetIdAndUserId(
        eventId,
        userId,
      );
    if (eventParticipate) {
      throw new NotFoundException(
        'You are already participating in this event',
      );
    }

    const createdInvitation = await this.eventInvitationService.create(
      eventId,
      userId,
    );
    return createdInvitation;
  }

  async updateInvitationStatus(
    invitationId: string,
    status: InvitationStatus,
  ): Promise<EventInvitation | null> {
    const invitation = await this.eventInvitationService.getById(invitationId);
    if (!invitation) {
      return null; // Invitation with the given ID not found
    }

    const eventBudget = await this.eventBudgetRepository.findOneBy({
      id: invitation.eventId,
    });

    if (!eventBudget) {
      throw new NotFoundException('Event budget not found');
    }

    const eventParticipate =
      await this.eventParticipateService.getByEventBudgetIdAndUserId(
        invitation.eventId,
        invitation.userId,
      );

    if (eventParticipate) {
      throw new NotFoundException(
        'You are already participating in this event',
      );
    }

    invitation.status = status;
    const updatedInvitation = await this.eventInvitationService.update(
      invitationId,
      status,
    );

    if (status === InvitationStatus.ACCEPTED) {
      const eventParticipate = new EventParticipate();
      eventParticipate.userId = invitation.userId;
      eventParticipate.eventBudgetId = invitation.eventId;
      await this.eventParticipateService.create(eventParticipate);
    }

    return updatedInvitation;
  }

  async getInvitationsByEventId(
    eventId: string,
    userId,
  ): Promise<EventInvitation[]> {
    const eventBudget = await this.eventBudgetRepository.findOneBy({
      id: eventId,
    });
    if (!eventBudget) {
      throw new NotFoundException('Event budget not found');
    }
    if (eventBudget.userId !== userId) {
      throw new NotFoundException(
        'You are not the creator of this event budget',
      );
    }

    return this.eventInvitationService.getByEventId(eventId);
  }
}

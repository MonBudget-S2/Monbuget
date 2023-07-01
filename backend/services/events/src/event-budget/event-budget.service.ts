import { Injectable } from '@nestjs/common';
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

export interface EventBudgetResponse extends EventBudget {
  eventParticipants: EventParticipate[];
}
@Injectable()
export class EventBudgetService {
  constructor(
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
    // const eventParticipantsCount = eventParticipants.length;

    const eventBudgetResponse = {
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
}

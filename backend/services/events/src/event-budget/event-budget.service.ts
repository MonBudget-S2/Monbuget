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
import { firstValueFrom } from 'rxjs';

export interface EventBudgetResponse extends EventBudget {
  eventParticipants: EventParticipate[];
}

@Injectable()
export class EventBudgetService {
  constructor(
    @Inject('EXPENSE_SERVICE') private readonly expenseService: ClientProxy,
    @Inject('DEBT_SERVICE') private readonly debtService: ClientProxy,

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

  async setEndofEvent(eventBudgetId: string) {
    const eventBudget = await this.eventBudgetRepository.findOneByOrFail({
      id: eventBudgetId,
    });

    eventBudget.endDate = new Date();
    const updatedEventBudget = await this.eventBudgetRepository.save(
      eventBudget,
    );
    console.log('updatedEventBudget', updatedEventBudget);
    console.log('eventBudgetId', eventBudgetId);
    const resultExpenseSharing = await this.resolveExpenseSharing(
      updatedEventBudget.id,
    );
    console.log('resultExpenseSharing', resultExpenseSharing);
    const transactions = resultExpenseSharing.transactions;
    const debtPromises = transactions.map(async (transaction) => {
      const createDebtDto = {
        userId: transaction.to,
        amount: transaction.amount,
        eventId: eventBudgetId,
      };
      return firstValueFrom(
        this.debtService.send(
          { service: 'debt', action: 'create' },
          createDebtDto,
        ),
      );
    });

    const debts = await Promise.all(debtPromises);

    return { ...resultExpenseSharing, debts };
  }

  /*
   * Resolve expense sharing
   * 1. Get all expenses of the event and Calculate the total expense
   * 2. Calculate the expense per person and Calculate the amount to be paid by each participant
   * 3. Create a transaction for each participant
   * */
  private async resolveExpenseSharing(eventBudgetId: string) {
    const eventBudget = await this.eventBudgetRepository.findOneBy({
      id: eventBudgetId,
    });
    if (!eventBudget) {
      throw new NotFoundException('Event budget not found');
    }

    const eventParticipants =
      await this.eventParticipateService.getByEventBudgetId(eventBudgetId);

    const listExpenses = await firstValueFrom(
      this.expenseService.send(
        { service: 'expense', action: 'getAllByEvent' },
        eventBudgetId,
      ),
    );

    const totalExpense = listExpenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
    const expensePerPerson = totalExpense / eventParticipants.length;
    const transactions = [];

    for (const participant of eventParticipants) {
      const participantExpense = listExpenses
        .filter((expense) => expense.userId === participant.userId)
        .reduce((total, expense) => total + expense.amount, 0);

      let difference = participantExpense - expensePerPerson;

      if (difference > 0) {
        for (const otherParticipant of eventParticipants) {
          if (otherParticipant !== participant) {
            const otherExpense = listExpenses
              .filter((expense) => expense.userId === otherParticipant.userId)
              .reduce((total, expense) => total + expense.amount, 0);

            const amount = Math.min(
              difference,
              expensePerPerson - otherExpense,
            );

            if (amount > 0 && eventBudget.userId !== participant.userId) {
              transactions.push({
                payer: eventBudget.userId,
                receiver: participant.userId,
                amount,
              });
              difference -= amount;
            }
          }
        }
      } else if (difference < 0) {
        for (const otherParticipant of eventParticipants) {
          if (otherParticipant !== participant) {
            const otherExpense = listExpenses
              .filter((expense) => expense.userId === otherParticipant.userId)
              .reduce((total, expense) => total + expense.amount, 0);

            const amount = Math.min(
              -difference,
              otherExpense - expensePerPerson,
            );

            if (amount > 0 && eventBudget.userId !== participant.userId) {
              transactions.push({
                payer: participant.userId,
                receiver: eventBudget.userId,
                amount,
              });
              difference += amount;
            }
          }
        }
      }
    }

    return { totalExpense, expensePerPerson, transactions };
  }
}

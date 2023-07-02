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

    console.log('eventParticipate', eventParticipate);
    console.log('invitation', invitation);

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
        remainingAmount: transaction.amount,
        eventBudgetId: updatedEventBudget.id,
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

  private async resolveExpenseSharing(eventBudgetId: string) {
    const eventBudget = await this.eventBudgetRepository.findOneBy({
      id: eventBudgetId,
    });
    if (!eventBudget) {
      throw new NotFoundException('Event budget not found');
    }
    const eventParticipants =
      await this.eventParticipateService.getByEventBudgetId(eventBudgetId);
    const totalParticipants = eventParticipants.length;
    const totalAmountPaid = eventParticipants.reduce(
      (total, participant) => total + participant.amountPaid,
      0,
    );
    const expensePerPerson = totalAmountPaid / totalParticipants;

    const transactions = [];

    // Calculate the amount each participant owes or is owed
    const participantsOwed = [];
    const participantsOwing = [];
    eventParticipants.forEach((participant) => {
      const amountToSettle = participant.amountPaid - expensePerPerson;
      if (amountToSettle < 0) {
        participantsOwed.push({
          userId: participant.userId,
          amountToSettle: Math.abs(amountToSettle),
        });
      } else if (amountToSettle > 0) {
        participantsOwing.push({
          userId: participant.userId,
          amountToSettle,
        });
      }
    });

    console.log('Participants Owed:', participantsOwed);
    console.log('Participants Owing:', participantsOwing);

    // Sort participants owed in descending order
    participantsOwed.sort((a, b) => b.amountToSettle - a.amountToSettle);

    // Sort participants owing in ascending order
    participantsOwing.sort((a, b) => a.amountToSettle - b.amountToSettle);

    // Distribute the amounts owed and owing
    while (participantsOwing.length > 0 && participantsOwed.length > 0) {
      const owedParticipant = participantsOwed[0];
      const owingParticipant = participantsOwing[0];

      console.log('test', owedParticipant, owingParticipant);
      const amountToTransfer = Math.min(
        owedParticipant.amountToSettle,
        owingParticipant.amountToSettle,
      );

      transactions.push({
        from: owingParticipant.userId,
        to: owedParticipant.userId,
        amount: amountToTransfer,
      });

      owedParticipant.amountToSettle -= amountToTransfer;
      owingParticipant.amountToSettle -= amountToTransfer;

      if (owedParticipant.amountToSettle === 0) {
        participantsOwed.shift();
      }

      if (owingParticipant.amountToSettle === 0) {
        participantsOwing.shift();
      }
    }

    console.log('Transactions:', transactions);

    const afterTransactions = eventParticipants.map((participant) => {
      const transactionsInvolved = transactions.filter(
        (transaction) =>
          transaction.from === participant.userId ||
          transaction.to === participant.userId,
      );
      const amountPaidAfterCalcul =
        participant.amountPaid +
        transactionsInvolved.reduce(
          (total, transaction) =>
            transaction.from === participant.userId
              ? total - transaction.amount
              : total + transaction.amount,
          0,
        );
      return {
        userId: participant.userId,
        amountPaidAfterCalcul,
      };
    });

    console.log('After Transactions:', afterTransactions);

    // For example, you can update the amountPaid for each participant in the database
    // await Promise.all(
    //   eventParticipants.map(async (participant) => {
    //     await this.eventParticipateService.update(participant.id, participant);
    //   }),
    // );

    // You can also perform other actions like sending notifications, generating reports, etc.
    return {
      totalAmountPaid,
      expensePerPerson,
      transactions,
    };
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Role } from "src/authentication/authentication.enum";
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from "./event-budget.request";
import { InvitationStatus } from "./event-invitation.enum";

@Injectable()
export class EventService {
  constructor(
    @Inject("EVENT_SERVICE") private readonly eventService: ClientProxy
    @Inject("EXPENSE_SERVICE") private readonly expenseService: ClientProxy
  ) {}

  async createEvent(createEventBudgetDto: CreateEventBudgetDto) {
    return await firstValueFrom(
      this.eventService.send(
        { service: "eventBudget", action: "create" },
        createEventBudgetDto
      )
    );
  }

  async getAllEvents(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.eventService.send({ service: "eventBudget", action: "getAll" }, {})
      );
    } else {
      return await firstValueFrom(
        this.eventService.send(
          { service: "eventBudget", action: "getAllByUser" },
          user.id
        )
      );
    }
  }

  async getEventById(id: string, user) {
    const isAdmin = user.role === Role.ADMIN;
    const event = await firstValueFrom(
      this.eventService.send({ service: "eventBudget", action: "getById" }, id)
    );
    if (!event) {
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
    }
    if (!isAdmin && event.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return event;
  }

  async getEventExpenses(id: string, user) {
    const eventParticipants = await firstValueFrom(
      this.eventService.send(
        { service: "eventParticipate", action: "getByEventAndUser" },
        { eventId: id, userId: user.id }
      )
    );
    if (!eventParticipants) {
      throw new HttpException("You are not part of this event", HttpStatus.FORBIDDEN);
    }
    return await firstValueFrom(
      this.expenseService.send(
        { service: "expense", action: "getAllByEvent" },
        id
      )
    );
  }



  async updateEvent(
    id: string,
    updateEventBudgetDto: UpdateEventBudgetDto,
    user
  ) {
    //get event by id and check if user is owner of event
    const event = await this.getEventById(id, user);
    updateEventBudgetDto.userId = event.userId;
    return await firstValueFrom(
      this.eventService.send(
        { service: "eventBudget", action: "update" },
        { id, updateEventBudgetDto }
      )
    );
  }

  async deleteEvent(id: string, user) {
    const event = await this.getEventById(id, user);
    return await firstValueFrom(
      this.eventService.send({ service: "eventBudget", action: "delete" }, id)
    );
  }

  async inviteUserToEvent(id: string, inviteeId: string, user) {
    const event = await this.getEventById(id, user);
    console.log("inviteUserToEvent", id, inviteeId, user);

    return await firstValueFrom(
      this.eventService.send(
        { service: "eventBudget", action: "createInvitation" },
        { userId: inviteeId, eventId: id }
      )
    );
  }

  async updateInvitation(invitationId: string, status: InvitationStatus, user) {
    const invitation = await firstValueFrom(
      this.eventService.send(
        { service: "eventInvitation", action: "getById" },
        invitationId
      )
    );
    console.log("acceptInvitation", invitation, user);
    if (!invitation) {
      throw new HttpException("Invitation not found", HttpStatus.NOT_FOUND);
    }
    if (invitation.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }

    return await firstValueFrom(
      this.eventService.send(
        { service: "eventBudget", action: "updateInvitationStatus" },
        { invitationId, status }
      )
    );
  }

  async markEventAsFinished(id: string, user) {
    const event = await this.getEventById(id, user);
    return await firstValueFrom(
      this.eventService.send({ service: "eventBudget", action: "endEvent" }, id)
    );
  }
}

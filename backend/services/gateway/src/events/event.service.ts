import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { Role } from "src/authentication/authentication.enum";
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from "./event-budget.request";
import { InvitationStatus } from "./event-invitation.enum";

@Injectable()
export class EventService {
  constructor(
    @Inject("EVENT_SERVICE") private readonly eventService: ClientProxy,
    @Inject("EXPENSE_SERVICE") private readonly expenseService: ClientProxy,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
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
      
    if (!isAdmin && !event.eventParticipants?.some((p) => p.userId === user.id)) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    if(event?.eventParticipants?.length > 0){

      const userPromises = event.eventParticipants.map(async (participant) => {
        const user = await lastValueFrom(
          this.userService.send(
            { service: "user", cmd: "getUserById" },
            participant.userId
          )
        );
        return { ...participant, user };
      });
      event.eventParticipants = await Promise.all(userPromises);
      console.log("event.participants", event.eventParticipants);
    }
    console.log("event **************", event);
    return event;
  }

  async getEventExpenses(id: string, user) {
    console.log("getEventExpenses", id, user);
    const eventParticipants = await firstValueFrom(
      this.eventService.send(
        { service: "eventParticipate", action: "getByEventAndUser" },
        { eventId: id, userId: user.id }
      )
    );
    console.log("eventParticipants", eventParticipants);
    if (!eventParticipants) {
      throw new HttpException(
        "You are not part of this event",
        HttpStatus.FORBIDDEN
      );
    }

    const allExpenses = await firstValueFrom(
      this.expenseService.send(
        { service: "expense", action: "getAllByEvent" },
        id
      )
    );

    return allExpenses;
  }

  async getParticipantExpenses(user) {
    console.log("test", user);
    const eventParticipants = await firstValueFrom(
      this.eventService.send(
        { service: "eventParticipate", action: "getAllByUser" },
        user.id
      )
    );

    if (!eventParticipants) {
      throw new HttpException(
        "You are not part of this event",
        HttpStatus.FORBIDDEN
      );
    }

    const userPromises = eventParticipants.map(async (participant) => {
      const user = await lastValueFrom(
        this.userService.send(
          { service: "user", cmd: "getUserById" },
          participant.userId
        )
      );
      return { ...participant, user };
    });

    const participantsWithUsers = await Promise.all(userPromises);
    // return eventParticipants;
    return participantsWithUsers;
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

  async inviteUserToEvent(id: string, inviteUsername: string, user) {
  
    const invitee = await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "getUserByUsername" },
        inviteUsername
      )
    );

    const invitations = await firstValueFrom(
      this.eventService.send(
        { service: "eventInvitation", action: "getByEventId" },
        id
      )
    );
        console.log("invitations ************", invitations);
        console.log("invitee **************", invitee);
    if (invitations.find((i) => i.userId === invitee.id)) {
      if (
        invitations.find(
          (i) =>
            i.userId === invitee.id && i.status === InvitationStatus.ACCEPTED
        )
      ) {
        throw new HttpException(
          "User already accepted invitation",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException("User already invited", HttpStatus.BAD_REQUEST);
    }

    if (!invitee) {
      throw new HttpException(
        "Invitee username not found ",
        HttpStatus.NOT_FOUND
      );
    }

    const event = await this.getEventById(id, user);
    console.log("inviteUserToEvent", id, inviteUsername, user);

    return await firstValueFrom(
      this.eventService.send(
        { service: "eventBudget", action: "createInvitation" },
        { eventId: id, userId: invitee.id }
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

  async getInvitations(user) {
    console.log("calling microservice eventInvitation");
    const invitations = await firstValueFrom(
      this.eventService.send(
        { service: "eventInvitation", action: "getAllByUser" },
        user.id
      )
    );

    const eventPromises = invitations.map(async (invitation) => {
      const event = await lastValueFrom(
        this.eventService.send(
          { service: "eventBudget", action: "getById" },
          invitation.eventId
        )
      );
      const owner = await lastValueFrom(
        this.userService.send(
          { service: "user", cmd: "getUserById" },
          event.userId
        )
      );
      return { ...invitation, event, owner };
    });
    const invitationsWithEventsAndUsers = await Promise.all(eventPromises);

    return invitationsWithEventsAndUsers;
  }

  async markEventAsFinished(id: string, user) {
    const event = await this.getEventById(id, user);
    return await firstValueFrom(
      this.eventService.send({ service: "eventBudget", action: "endEvent" }, id)
    );
  }
}

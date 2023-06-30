import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Role } from "src/authentication/authentication.enum";
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from "./event-budget.request";

@Injectable()
export class EventService {
  constructor(
    @Inject("EVENT_SERVICE") private readonly eventService: ClientProxy
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
    if (!isAdmin && event.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return event;
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
}

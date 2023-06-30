import { Controller, Get } from '@nestjs/common';
import { EventBudgetService } from './event-budget.service';
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from './event-budget.request';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: EventBudgetService) {}

  @MessagePattern({ service: 'eventBudget', action: 'create' })
  createEventBudget(createEventBudgetDto: CreateEventBudgetDto) {
    return this.appService.create(createEventBudgetDto);
  }

  @MessagePattern({ service: 'eventBudget', action: 'getAll' })
  getAllEventBudgets() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'eventBudget', action: 'getAllByUser' })
  getAllEventBudgetsByUser(userId: string) {
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
}

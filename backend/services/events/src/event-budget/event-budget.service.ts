import { Injectable } from '@nestjs/common';
import { CreateEventBudgetDto } from './dto/create-event-budget.dto';
import { UpdateEventBudgetDto } from './dto/update-event-budget.dto';

@Injectable()
export class EventBudgetService {
  create(createEventBudgetDto: CreateEventBudgetDto) {
    return 'This action adds a new eventBudget';
  }

  findAll() {
    return `This action returns all eventBudget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventBudget`;
  }

  update(id: number, updateEventBudgetDto: UpdateEventBudgetDto) {
    return `This action updates a #${id} eventBudget`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventBudget`;
  }
}

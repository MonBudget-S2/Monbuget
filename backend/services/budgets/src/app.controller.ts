import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'budget', action: 'create' })
  createBudget(budget: CreateBudgetDto) {
    return this.appService.create(budget);
  }

  @MessagePattern({ service: 'budget', action: 'getAll' })
  getAllBudgets() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'budget', action: 'getById' })
  getBudgetById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'budget', action: 'update' })
  updateBudget(@Payload() payload: { id: string; budget: UpdateBudgetDto }) {
    const { id, budget } = payload;
    return this.appService.update(id, budget);
  }

  @MessagePattern({ service: 'budget', action: 'delete' })
  deleteBudget(id: string) {
    return this.appService.delete(id);
  }
}

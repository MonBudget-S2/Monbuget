import { Controller, Get } from '@nestjs/common';
import { AppService, BudgetResponse } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'budget', action: 'create' })
  createBudget(budget: CreateBudgetDto) {
    console.log('budget', budget);

    return this.appService.create(budget);
  }

  @MessagePattern({ service: 'budget', action: 'getAll' })
  async getAllBudgets(): Promise<BudgetResponse[]> {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'budget', action: 'getAllByUser' })
  getAllBudgetsByUser(userId: string): Promise<BudgetResponse[]> {
    return this.appService.getAllByUser(userId);
  }

  @MessagePattern({ service: 'budget', action: 'getById' })
  getBudgetById(id: string): Promise<BudgetResponse> {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'budget', action: 'update' })
  updateBudget(
    @Payload() payload: { id: string; updateBudgetDto: UpdateBudgetDto },
  ) {
    const { id, updateBudgetDto } = payload;
    console.log('controller updateBudget', updateBudgetDto);
    return this.appService.update(id, updateBudgetDto);
  }

  @MessagePattern({ service: 'budget', action: 'delete' })
  deleteBudget(id: string) {
    return this.appService.delete(id);
  }
}

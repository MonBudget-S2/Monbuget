import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateIncomeDto, UpdateIncomeDto } from './income.request';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'income', action: 'create' })
  createIncome(income: CreateIncomeDto) {
    return this.appService.create(income);
  }

  @MessagePattern({ service: 'income', action: 'getAll' })
  getAllBudgets() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'income', action: 'getById' })
  getIncomeById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'income', action: 'update' })
  updateIncome({ id, income }: { id: string; income: UpdateIncomeDto }) {
    return this.appService.update(id, income);
  }

  @MessagePattern({ service: 'income', action: 'delete' })
  deleteIncome(id: string) {
    return this.appService.delete(id);
  }
}

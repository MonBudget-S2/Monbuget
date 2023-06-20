import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'expense', action: 'create' })
  createExpense(expense: CreateExpenseDto) {
    return this.appService.create(expense);
  }

  @MessagePattern({ service: 'expense', action: 'getAll' })
  getAllExpenses() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'expense', action: 'getById' })
  getExpenseById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'expense', action: 'update' })
  updateExpense({ id, expense }: { id: string; expense: UpdateExpenseDto }) {
    return this.appService.update(id, expense);
  }

  @MessagePattern({ service: 'expense', action: 'delete' })
  deleteExpense(id: string) {
    return this.appService.delete(id);
  }
}

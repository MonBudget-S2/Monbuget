import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'expense', action: 'create' })
  createExpense(createExpenseDto: CreateExpenseDto) {
    return this.appService.create(createExpenseDto);
  }

  @MessagePattern({ service: 'expense', action: 'getAll' })
  getAllExpenses() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'expense', action: 'getById' })
  getExpenseById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'expense', action: 'getAllByUser' })
  getAllExpensesByUser(userId: string) {
    return this.appService.getAllByUser(userId);
  }

  @MessagePattern({ service: 'expense', action: 'update' })
  updateExpense(
    @Payload() payload: { id: string; updateExpenseDto: UpdateExpenseDto },
  ) {
    const { id, updateExpenseDto } = payload;
    return this.appService.update(id, updateExpenseDto);
  }

  @MessagePattern({ service: 'expense', action: 'delete' })
  deleteExpense(id: string) {
    return this.appService.delete(id);
  }
}

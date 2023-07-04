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

  @MessagePattern({ service: 'expense', action: 'getAllByBudget' })
  getAllExpensesByBudget(
    @Payload()
    payload: {
      categoryId: string;
      startDate: string;
      endDate: string;
    },
  ) {
    const { categoryId, startDate, endDate } = payload;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    return this.appService.getAllByOnlyCategory(
      categoryId,
      parsedStartDate,
      parsedEndDate,
    );
  }

  @MessagePattern({ service: 'expense', action: 'getAllByEvent' })
  getAllExpensesByEvent(eventId: string) {
    // console.log('payload', payload);
    // const { eventId } = payload;
    return this.appService.getAllByEvent(eventId);
  }

  // @MessagePattern({
  //   service: 'expense',
  //   action: 'getTotalAmountByUserForEvents',
  // })
  // getTotalAmountByUserForEvents(
  //   @Payload()
  //   payload: {
  //     userId: string;
  //   },
  // ) {
  //   const { userId } = payload;
  //   return this.appService.getTotalAmountByUserForEvents(userId);
  // }

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

  @MessagePattern({
    service: 'expense',
    action: 'getTotalAmountByCategoryAndPeriod',
  })
  getTotalAmountByCategory(
    @Payload() payload: { userId?: string; year?: number; month?: number },
  ) {
    const { userId, year, month } = payload;
    return this.appService.getTotalAmountByCategoryAndPeriod(
      userId,
      year,
      month,
    );
  }

  @MessagePattern({
    service: 'expense',
    action: 'getTotalAmountByPeriod',
  })
  getTotalAmountByPeriod(
    @Payload() payload: { userId?: string; year?: number; month?: number },
  ) {
    console.log('payload--------');
    const { userId, year, month } = payload;
    return this.appService.getTotalAmountByPeriod(userId, year, month);
  }
}

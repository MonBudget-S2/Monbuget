import { Inject, Injectable } from '@nestjs/common';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.request';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

export interface ExpenseResponse {
  id: string;
  description: string;
  amount: number;
  date: Date;
  location?: string;
  receiptImage?: string;
  userId?: string;
  category?: object; // Include the category object
  eventBudget?: object; // Include the eventBudget object
}

@Injectable()
export class AppService {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly categoryService: ClientProxy,
    @Inject('EVENT_SERVICE')
    private readonly eventBudgetService: ClientProxy,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<any> {
    const newExpense = this.expenseRepository.create(createExpenseDto);
    await this.expenseRepository.save(newExpense);
    return { message: 'Expense created successfully', newExpense };
  }

  async getById(id: string): Promise<ExpenseResponse | null> {
    const expense = await this.expenseRepository.findOneBy({ id });

    if (!expense) {
      return null; // Expense with the given ID not found
    }

    const [category, eventBudget] = await Promise.all([
      expense.categoryId
        ? firstValueFrom(
            this.categoryService.send(
              { service: 'category', action: 'getById' },
              expense.categoryId,
            ),
          )
        : null,
      expense.eventBudgetId
        ? firstValueFrom(
            this.eventBudgetService.send(
              { service: 'eventBudget', action: 'getById' },
              expense.eventBudgetId,
            ),
          )
        : null,
    ]);

    const expenseResponse: ExpenseResponse = {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      location: expense.location,
      receiptImage: expense.receiptImage,
      userId: expense.userId,
      category,
      eventBudget,
    };

    return expenseResponse;
  }

  async getAll(): Promise<ExpenseResponse[]> {
    const expenses = await this.expenseRepository.find();
    const expenseResponses: ExpenseResponse[] = [];

    for (const expense of expenses) {
      const [category, eventBudget] = await Promise.all([
        expense.categoryId
          ? firstValueFrom(
              this.categoryService.send(
                { service: 'category', action: 'getById' },
                expense.categoryId,
              ),
            )
          : null,
        expense.eventBudgetId
          ? firstValueFrom(
              this.eventBudgetService.send(
                { service: 'eventBudget', action: 'getById' },
                expense.eventBudgetId,
              ),
            )
          : null,
      ]);

      const expenseResponse: ExpenseResponse = {
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        location: expense.location,
        receiptImage: expense.receiptImage,
        userId: expense.userId,
        category,
        eventBudget,
      };

      expenseResponses.push(expenseResponse);
    }

    return expenseResponses;
  }

  async getAllByUser(userId: string): Promise<ExpenseResponse[]> {
    const expenses = await this.expenseRepository.find({ where: { userId } });
    const expenseResponses: ExpenseResponse[] = [];

    for (const expense of expenses) {
      const [category, eventBudget] = await Promise.all([
        expense.categoryId
          ? firstValueFrom(
              this.categoryService.send(
                { service: 'category', action: 'getById' },
                expense.categoryId,
              ),
            )
          : null,
        expense.eventBudgetId
          ? firstValueFrom(
              this.eventBudgetService.send(
                { service: 'eventBudget', action: 'getById' },
                expense.eventBudgetId,
              ),
            )
          : null,
      ]);

      const expenseResponse: ExpenseResponse = {
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        location: expense.location,
        receiptImage: expense.receiptImage,
        userId: expense.userId,
        category,
        eventBudget,
      };

      expenseResponses.push(expenseResponse);
    }

    return expenseResponses;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense | null> {
    const expense = await this.expenseRepository.findOneBy({ id });

    if (!expense) {
      return null; // Expense with the given ID not found
    }

    const updatedExpense = await this.expenseRepository.save({
      ...expense,
      ...updateExpenseDto,
    });

    return updatedExpense;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.expenseRepository.delete(id);
    return result.affected > 0;
  }
}

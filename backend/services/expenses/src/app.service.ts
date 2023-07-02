import { Inject, Injectable } from '@nestjs/common';
import { Expense } from './expense.entity';
import { Between, IsNull, Repository } from 'typeorm';
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

  async getAllByOnlyCategory(
    categoryId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Expense[]> {
    const expenses = await this.expenseRepository.find({
      where: {
        categoryId,
        eventBudgetId: IsNull(),
        date: Between(startDate, endDate),
      },
    });
    return expenses;
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

  async getAllByEvent(eventBudgetId: string): Promise<Expense[]> {
    const expenses = await this.expenseRepository.find({
      where: {
        eventBudgetId,
      },
    });
    return expenses;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.expenseRepository.delete(id);
    return result.affected > 0;
  }

  async getTotalAmountByCategoryAndPeriod(
    userId?: string,
    year?: number,
    month?: number,
  ): Promise<{ category: string; totalAmount: number }[]> {
    const queryBuilder = this.expenseRepository.createQueryBuilder('expense');

    if (userId) {
      queryBuilder.andWhere('expense.userId = :userId', { userId });
    }

    if (year) {
      queryBuilder.andWhere('EXTRACT(YEAR FROM expense.date) = :year', {
        year,
      });
    }

    if (month) {
      queryBuilder.andWhere('EXTRACT(MONTH FROM expense.date) = :month', {
        month,
      });
    }

    const expenses = await queryBuilder.getMany();

    const categoryMap = new Map<string, number>();

    for (const expense of expenses) {
      const categoryId = expense.categoryId;

      if (categoryId) {
        const [category] = await Promise.all([
          firstValueFrom(
            this.categoryService.send(
              { service: 'category', action: 'getById' },
              categoryId,
            ),
          ),
        ]);

        if (category) {
          const categoryName = category.name;
          const expenseAmount = expense.amount;

          if (categoryMap.has(categoryName)) {
            categoryMap.set(
              categoryName,
              categoryMap.get(categoryName) + expenseAmount,
            );
          } else {
            categoryMap.set(categoryName, expenseAmount);
          }
        }
      }
    }

    const totalAmountByCategory: { category: string; totalAmount: number }[] =
      [];

    for (const [categoryName, totalAmount] of categoryMap.entries()) {
      totalAmountByCategory.push({ category: categoryName, totalAmount });
    }

    return totalAmountByCategory;
  }

  async getTotalAmountByPeriod(
    userId?: string,
    year?: number,
    month?: number,
  ): Promise<{ period: string; totalAmount: number }[]> {
    const queryBuilder = this.expenseRepository.createQueryBuilder('expense');

    if (userId) {
      queryBuilder.andWhere('expense.userId = :userId', { userId });
    }

    if (year && !month) {
      queryBuilder
        .select(
          `TO_CHAR(expense.date, 'YYYY-MM') as period, SUM(expense.amount) as totalAmount`,
        )
        .andWhere('EXTRACT(YEAR FROM expense.date) = :year', { year })
        .groupBy(`TO_CHAR(expense.date, 'YYYY-MM')`)
        .orderBy(`TO_CHAR(expense.date, 'YYYY-MM')`);

      const expenses = await queryBuilder.getRawMany();
      const totalAmountByPeriod: { period: string; totalAmount: number }[] = [];

      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const period = currentDate.toISOString().substr(0, 7); // Get date in "YYYY-MM" format
        const expense = expenses.find((item) => item.period === period);
        const totalAmount = expense ? +expense.totalamount : 0;
        totalAmountByPeriod.push({ period, totalAmount });
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return totalAmountByPeriod;
    } else if (year && month) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      queryBuilder
        .select(
          `TO_CHAR(expense.date, 'YYYY-MM-DD') as period, SUM(expense.amount) as totalamount`,
        )
        .andWhere('expense.date >= :startDate', { startDate })
        .andWhere('expense.date <= :endDate', { endDate })
        .groupBy(`TO_CHAR(expense.date, 'YYYY-MM-DD')`)
        .orderBy(`TO_CHAR(expense.date, 'YYYY-MM-DD')`);

      const expenses = await queryBuilder.getRawMany();
      const totalAmountByPeriod: { period: string; totalAmount: number }[] = [];

      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const period = currentDate.toISOString().substr(0, 10); // Get date in "YYYY-MM-DD" format
        const expense = expenses.find((item) => item.period === period);
        const totalAmount = expense ? +expense.totalamount : 0;
        totalAmountByPeriod.push({ period, totalAmount });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return totalAmountByPeriod;
    } else {
      queryBuilder
        .select(
          `TO_CHAR(expense.date, 'YYYY-MM') as period, SUM(expense.amount) as totalamount`,
        )
        .groupBy(`TO_CHAR(expense.date, 'YYYY-MM')`)
        .orderBy(`TO_CHAR(expense.date, 'YYYY-MM')`);

      const expenses = await queryBuilder.getRawMany();
      const totalAmountByPeriod: { period: string; totalAmount: number }[] = [];

      for (const expense of expenses) {
        const period = expense.period || ''; // Access period from query result
        const totalAmount = expense.totalamount;
        totalAmountByPeriod.push({ period, totalAmount });
      }

      // Sort totalAmountByPeriod in ascending order based on the period
      totalAmountByPeriod.sort((a, b) => (a.period > b.period ? 1 : -1));

      return totalAmountByPeriod;
    }
  }
}

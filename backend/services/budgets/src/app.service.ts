import { Inject, Injectable } from '@nestjs/common';
import { Budget } from './budget.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.request';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export interface BudgetResponse {
  id: string;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  category: []; // Include the category object
  expenses: object[]; // Include the expenses array
}

@Injectable()
export class AppService {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly categoryService: ClientProxy,
    @Inject('EXPENSE_SERVICE') private readonly expenseService: ClientProxy,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<any> {
    if (createBudgetDto.categoryId) {
      return await this.saveBudgetToDatabase(createBudgetDto);
    } else if (createBudgetDto.customCategory) {
      const categoryDto = {
        name: createBudgetDto.customCategory,
        userId: createBudgetDto.userId,
      };
      let createdCategory;
      try {
        const res = await this.createCategory(categoryDto);
        createdCategory = await res.newCategory;
        createBudgetDto.categoryId = createdCategory.id;
        console.log('createBudgetDto', createBudgetDto);
        return await this.saveBudgetToDatabase(createBudgetDto);
      } catch (error) {
        // Delete the created category if budget creation fails
        if (
          error.response &&
          error.response.message === 'Budget creation failed'
        ) {
          await this.deleteCategory(createdCategory.id);
        }
        throw error; // Rethrow the error to be handled by the caller
      }
    }

    const newExpense = this.budgetRepository.create(createBudgetDto);
    await this.budgetRepository.save(newExpense);
    return { message: 'Budget created successfully' };
  }

  async getById(id: string): Promise<BudgetResponse | null> {
    const budget = await this.budgetRepository.findOneBy({ id });
    if (!budget) {
      return null; // Budget with the given ID not found
    }
    const category = await firstValueFrom(
      this.categoryService.send(
        { service: 'category', action: 'getById' },
        budget.categoryId,
      ),
    );

    const expenses = await this.getAllExpensesByBudget(
      budget.categoryId,
      budget.startDate,
      budget.endDate,
    );

    const budgetResponse: BudgetResponse = {
      id: budget.id,
      name: budget.name,
      amount: budget.amount,
      startDate: budget.startDate,
      endDate: budget.endDate,
      userId: budget.userId,
      category: category,
      expenses: expenses,
    };
    return budgetResponse;
  }

  async getAll(): Promise<BudgetResponse[]> {
    const budgets = await this.budgetRepository.find();
    const budgetResponses: BudgetResponse[] = [];

    for (const budget of budgets) {
      const category = await firstValueFrom(
        this.categoryService.send(
          { service: 'category', action: 'getById' },
          budget.categoryId,
        ),
      );

      const expenses = await this.getAllExpensesByBudget(
        budget.categoryId,
        budget.startDate,
        budget.endDate,
      );

      const budgetResponse: BudgetResponse = {
        id: budget.id,
        name: budget.name,
        amount: budget.amount,
        startDate: budget.startDate,
        endDate: budget.endDate,
        userId: budget.userId,
        category: category,
        expenses: expenses,
      };

      budgetResponses.push(budgetResponse);
    }

    return budgetResponses;
  }

  async getAllByUser(userId: string): Promise<BudgetResponse[]> {
    const budgets = await this.budgetRepository.find({ where: { userId } });
    const budgetResponses: BudgetResponse[] = [];

    for (const budget of budgets) {
      const category = await firstValueFrom(
        this.categoryService.send(
          { service: 'category', action: 'getById' },
          budget.categoryId,
        ),
      );

      const expenses = await this.getAllExpensesByBudget(
        budget.categoryId,
        budget.startDate,
        budget.endDate,
      );

      const budgetResponse: BudgetResponse = {
        id: budget.id,
        name: budget.name,
        amount: budget.amount,
        startDate: budget.startDate,
        endDate: budget.endDate,
        userId: budget.userId,
        category: category,
        expenses: expenses,
      };

      budgetResponses.push(budgetResponse);
    }
    console.log('budgetResponses', budgetResponses);
    return budgetResponses;
  }

  async update(
    id: string,
    updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget | null> {
    const budget = await this.budgetRepository.findOneByOrFail({ id });
    console.log('updateDto', updateBudgetDto);
    if (updateBudgetDto.categoryId) {
      return await this.updateBudgetInDatabase(id, updateBudgetDto);
    } else if (updateBudgetDto.customCategory) {
      const categoryDto = {
        name: updateBudgetDto.customCategory,
        userId: updateBudgetDto.userId,
      };
      let createdCategory;
      try {
        const res = await this.createCategory(categoryDto);
        createdCategory = await res.newCategory;
        updateBudgetDto.categoryId = createdCategory.id;
        console.log('updateBudgetDto', updateBudgetDto);
        return await this.updateBudgetInDatabase(id, updateBudgetDto);
      } catch (error) {
        // Delete the created category if budget update fails
        if (
          error.response &&
          error.response.message === 'Budget update failed'
        ) {
          await this.deleteCategory(createdCategory.id);
        }
        throw error; // Rethrow the error to be handled by the caller
      }
    }
    const updatedBudget = await this.budgetRepository.save({
      ...budget,
      ...updateBudgetDto,
    });
    return updatedBudget;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.budgetRepository.delete(id);
    return result.affected > 0;
  }

  private async saveBudgetToDatabase(
    createBudgetDto: CreateBudgetDto,
  ): Promise<Budget> {
    const { customCategory, ...budgetDto } = createBudgetDto;
    return this.budgetRepository.save(budgetDto);
  }

  private async updateBudgetInDatabase(
    id: string,
    updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget | null> {
    const updatedBudget = await this.budgetRepository.save({
      ...updateBudgetDto,
      id,
    });
    console.log('updatedBudget', updatedBudget);
    return updatedBudget;
  }

  private async createCategory(categoryDto): Promise<any> {
    return await firstValueFrom(
      this.categoryService.send(
        { service: 'category', action: 'create' },
        categoryDto,
      ),
    );
  }
  private async deleteCategory(categoryId: string): Promise<void> {
    try {
      await firstValueFrom(
        this.categoryService.send(
          { service: 'category', action: 'delete' },
          categoryId,
        ),
      );
      console.log('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error.message);
      // Handle the error or throw it to be handled by the caller
      throw error;
    }
  }

  async getAllExpensesByBudget(
    budgetId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<any[]> {
    return await firstValueFrom(
      this.expenseService.send(
        { service: 'expense', action: 'getAllByBudget' },
        { budgetId, startDate, endDate },
      ),
    );
  }
}

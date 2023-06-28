import { Injectable } from '@nestjs/common';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<any> {
    const newExpense = this.expenseRepository.create(createExpenseDto);
    await this.expenseRepository.save(newExpense);
    return { message: 'Expense created successfully', newExpense };
  }

  async getById(id: string): Promise<Expense | null> {
    return this.expenseRepository.findOneBy({ id });
  }

  async getAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async getAllByUser(userId: string): Promise<Expense[]> {
    const expenses = await this.expenseRepository.find({ where: { userId } });
    return expenses;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense | null> {
    const expense = await this.expenseRepository.findOneByOrFail({ id });
    const updatedExpense = await this.expenseRepository.save({
      ...expense,
      ...updateExpenseDto,
    });

    console.log('updatedExpense', updatedExpense);

    return updatedExpense;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.expenseRepository.delete(id);
    return result.affected > 0;
  }
}

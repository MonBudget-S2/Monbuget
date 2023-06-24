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
    return { message: 'Expense created successfully' };
  }

  async getById(id: string): Promise<Expense | null> {
    return this.expenseRepository.findOneBy({ id });
  }

  async getAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense | null> {
    const result = await this.expenseRepository.update(id, updateExpenseDto);

    if (result.affected === 0) {
      return null; // Expense with the given ID not found
    }

    return this.expenseRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.expenseRepository.delete(id);
    return result.affected > 0;
  }
}

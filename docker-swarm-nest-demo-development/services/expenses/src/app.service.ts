import { Injectable } from '@nestjs/common';
import { Expense } from './expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async createExpense(data: any): Promise<any> {
    const newExpense = this.expenseRepository.create(data);
    await this.expenseRepository.save(newExpense);
    return { message: 'Expense created successfully' };
  }
}

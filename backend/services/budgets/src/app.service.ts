import { Injectable } from '@nestjs/common';
import { Budget } from './budget.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async createBudget(data: any): Promise<any> {
    const newExpense = this.budgetRepository.create(data);
    await this.budgetRepository.save(newExpense);
    return { message: 'Budget created successfully' };
  }
}

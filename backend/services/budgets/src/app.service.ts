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

  async create(data: any): Promise<any> {
    const newExpense = this.budgetRepository.create(data);
    await this.budgetRepository.save(newExpense);
    return { message: 'Budget created successfully' };
  }

  async getById(id: string): Promise<Budget | null> {
    return this.budgetRepository.findOneBy({ id });
  }

  async getAll(): Promise<Budget[]> {
    return this.budgetRepository.find();
  }

  async update(
    id: string,
    data: Partial<Budget>,
  ): Promise<Budget | null> {
    const result = await this.budgetRepository.update(id, data);

    if (result.affected === 0) {
      return null; // Budget with the given ID not found
    }

    return this.budgetRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.budgetRepository.delete(id);
    return result.affected > 0;
  }
}

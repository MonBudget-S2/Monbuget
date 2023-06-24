import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './income.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDto, UpdateIncomeDto } from './income.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto): Promise<any> {
    console.log('createIncomeDto', createIncomeDto);
    const newIncome = this.incomeRepository.create(createIncomeDto);
    console.log('newIncome', newIncome);
    await this.incomeRepository.save(newIncome);
    return { message: 'Budget created successfully' };
  }

  async getById(id: string): Promise<Income | null> {
    return this.incomeRepository.findOneBy({ id });
  }

  async getAll(): Promise<Income[]> {
    return this.incomeRepository.find();
  }

  async getAllByUser(userId: string): Promise<Income[]> {
    return this.incomeRepository.find({ where: { userId } });
  }

  async update(
    id: string,
    updateIncomeDto: UpdateIncomeDto,
  ): Promise<Income | null> {
    const result = await this.incomeRepository.update(id, updateIncomeDto);

    if (result.affected === 0) {
      return null; // Budget with the given ID not found
    }

    return this.incomeRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.incomeRepository.delete(id);
    return result.affected > 0;
  }
}

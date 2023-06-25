import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './income.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDto, UpdateIncomeDto } from './income.request';
import { Raw } from 'typeorm';
import { IncomeType } from './income.enum';

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

  async getAllIncomesByTypeForYear(
    year: number,
    userId?: string,
  ): Promise<{
    incomesByType: { [type: string]: number[] };
    totalIncome: number;
  }> {
    // const incomes = await this.incomeRepository.find({
    //   where: {
    //     date: Raw(
    //       (alias) =>
    //         `${alias} >= '${currentYear}-01-01' AND ${alias} <= '${currentYear}-12-31'`,
    //     ),
    //   },
    //   order: {
    //     date: 'ASC',
    //   },
    // });
    const queryBuilder = this.incomeRepository.createQueryBuilder('income');

    queryBuilder
      .where('income.date >= :startDate', { startDate: `${year}-01-01` })
      .andWhere('income.date <= :endDate', { endDate: `${year}-12-31` })
      .orderBy('income.date', 'ASC');

    if (userId) {
      queryBuilder.andWhere('income.userId = :userId', { userId });
    }

    const incomes = await queryBuilder.getMany();
    let totalIncome = 0;

    const incomesByType: { [type: string]: number[] } = {};

    Object.values(IncomeType).forEach((category) => {
      incomesByType[category] = new Array(12).fill(0);
    });

    incomes.forEach((income) => {
      const { amount, type, date } = income;
      const month = new Date(date).getMonth();

      if (type && incomesByType[type]) {
        incomesByType[type][month] += amount;
        totalIncome += amount;
      }
    });

    return { incomesByType, totalIncome };
  }
}

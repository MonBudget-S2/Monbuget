import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from './debt.entity';
import { CreateDebtDto, UpdateDebtDto } from './debt.request';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private debtRepository: Repository<Debt>,
  ) {}

  async create(createDebtDto: CreateDebtDto): Promise<Debt> {
    const newDebt = this.debtRepository.create(createDebtDto);
    return this.debtRepository.save(newDebt);
  }

  async findAll(): Promise<Debt[]> {
    return this.debtRepository.find();
  }

  async findById(id: string): Promise<Debt | null> {
    return this.debtRepository.findOneBy({ id });
  }

  async update(id: string, updateDebtDto: UpdateDebtDto): Promise<Debt | null> {
    const debt = await this.debtRepository.findOneBy({ id });
    if (!debt) {
      return null; // Debt with the given ID not found
    }
    const updatedDebt = { ...debt, ...updateDebtDto };
    return this.debtRepository.save(updatedDebt);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.debtRepository.delete(id);
    return result.affected > 0;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Budget } from './budget.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.request';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly categoryService: ClientProxy,
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
      const res = await this.createCategory(categoryDto);
      const createdCategory = await res.newCategory;
      createBudgetDto.categoryId = createdCategory.id;
      console.log('createBudgetDto', createBudgetDto);
      return await this.saveBudgetToDatabase(createBudgetDto);
    }

    const newExpense = this.budgetRepository.create(createBudgetDto);
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
    updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget | null> {
    const result = await this.budgetRepository.update(id, updateBudgetDto);

    if (result.affected === 0) {
      return null; // Budget with the given ID not found
    }

    return this.budgetRepository.findOneBy({ id });
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

  private async createCategory(categoryDto): Promise<any> {
    return await firstValueFrom(
      this.categoryService.send(
        { service: 'category', action: 'create' },
        categoryDto,
      ),
    );
  }
}

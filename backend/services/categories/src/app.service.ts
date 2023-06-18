import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: any): Promise<any> {
    const newCategory = this.categoryRepository.create(data);
    await this.categoryRepository.save(newCategory);
    return { message: 'Category created successfully' };
  }

  async getById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async update(id: string, data: Partial<Category>): Promise<Category | null> {
    const result = await this.categoryRepository.update(id, data);

    if (result.affected === 0) {
      return null; // Category with the given ID not found
    }

    return this.categoryRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected > 0;
  }
}

import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './category.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);
    return { message: 'Category created successfully' };
  }

  async getById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    const result = await this.categoryRepository.update(id, updateCategoryDto);

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

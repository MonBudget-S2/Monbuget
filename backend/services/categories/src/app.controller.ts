import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto, UpdateCategoryDto } from './category.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'category', action: 'create' })
  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.appService.create(createCategoryDto);
  }

  @MessagePattern({ service: 'category', action: 'getAll' })
  getAllCategories() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'category', action: 'getAllByUser' })
  getAllCategoriesByUser(userId: string) {
    return this.appService.getAllByUser(userId);
  }

  @MessagePattern({ service: 'category', action: 'getById' })
  getCategoryById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'category', action: 'update' })
  updateCategory(
    @Payload() payload: { id: string; category: UpdateCategoryDto },
  ) {
    const { id, category } = payload;
    return this.appService.update(id, category);
  }

  @MessagePattern({ service: 'category', action: 'delete' })
  deleteCategory(id: string) {
    return this.appService.delete(id);
  }
}

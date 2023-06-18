import { Controller, Post, Body, UseGuards, Get, Put, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.request';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(":id")
  getCategoryById(@Param("id") id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Put(":id")
  updateCategory(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(":id")
  deleteCategory(@Param("id") id: string) {
    return this.categoryService.deleteCategory(id);
  }

}

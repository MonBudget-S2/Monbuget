import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Delete,
  Param,
  Req,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.request";
import {
  AuthenticationRequired,
  HasRole,
} from "src/authentication/authentication.decorator";
@AuthenticationRequired()
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: CustomRequest
  ) {
    createCategoryDto.userId = request.user.id;
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getAllCategories(@Req() request: CustomRequest) {
    return this.categoryService.getAllCategories(request.user);
  }

  @Get(":id")
  getCategoryById(@Param("id") id: string, @Req() request: CustomRequest) {
    return this.categoryService.getCategoryById(id, request.user);
  }

  @Put(":id")
  updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() request: CustomRequest
  ) {
    return this.categoryService.updateCategory(
      id,
      updateCategoryDto,
      request.user
    );
  }

  @Delete(":id")
  deleteCategory(@Param("id") id: string, @Req() request: CustomRequest) {
    return this.categoryService.deleteCategory(id, request.user);
  }
}

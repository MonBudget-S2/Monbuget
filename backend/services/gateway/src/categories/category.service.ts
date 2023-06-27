import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.request";
import { Role } from "src/authentication/authentication.enum";

@Injectable()
export class CategoryService {
  constructor(
    @Inject("CATEGORY_SERVICE") private readonly categoryService: ClientProxy
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await firstValueFrom(
      this.categoryService.send(
        { service: "category", action: "create" },
        createCategoryDto
      )
    );
  }
  async getAllCategories(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.categoryService.send({ service: "category", action: "getAll" }, {})
      );
    }
    return await firstValueFrom(
      this.categoryService.send(
        { service: "category", action: "getAllByUser" },
        user.id
      )
    );
  }

  async getCategoryById(id: string, user) {
    const isAdmin = user.role === Role.ADMIN;
    const category = await firstValueFrom(
      this.categoryService.send({ service: "category", action: "getById" }, id)
    );
    if (!isAdmin && category.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, user) {
    const category = await this.getCategoryById(id, user);
    updateCategoryDto.userId = category.userId;
    return await firstValueFrom(
      this.categoryService.send(
        { service: "category", action: "update" },
        { id, updateCategoryDto }
      )
    );
  }

  async deleteCategory(id: string, user) {
    const category = await this.getCategoryById(id, user);
    return await firstValueFrom(
      this.categoryService.send({ service: "category", action: "delete" }, id)
    );
  }
}

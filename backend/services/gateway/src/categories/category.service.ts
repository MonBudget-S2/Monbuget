import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.request";

@Injectable()
export class CategoryService {


  constructor(
    @Inject("CATEGORY_SERVICE") private readonly categoryService: ClientProxy

  ) {}
    
  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await firstValueFrom(
      this.categoryService.send(
        { service: "category", cmd: "create" },
        { category: createCategoryDto }
      )
    );
}
async getAllCategories() {
    return await firstValueFrom(
      this.categoryService.send({ service: "category", cmd: "getAll" }, {})
    );
  }

  async getCategoryById(id: string) {
    return await firstValueFrom(
      this.categoryService.send({ service: "category", cmd: "getById" }, { id })
    );
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await firstValueFrom(
      this.categoryService.send({ service: "category", cmd: "update" }, { id, category: updateCategoryDto })
    );
  }

  async deleteCategory(id: string) {
    return await firstValueFrom(
      this.categoryService.send({ service: "category", cmd: "delete" }, { id })
    );
  }
}


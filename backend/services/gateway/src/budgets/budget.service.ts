import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateBudgetDto, UpdateBudgetDto } from "./budget.request";
import { Role } from "src/authentication/authentication.enum";

@Injectable()
export class BudgetService {
  constructor(
    @Inject("BUDGET_SERVICE") private readonly budgetService: ClientProxy
  ) {}

  async createBudget(createBudgetDto: CreateBudgetDto) {
    return await firstValueFrom(
      this.budgetService.send(
        { service: "budget", action: "create" },
        { budget: createBudgetDto }
      )
    );
  }
  async getAllBudgets(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.budgetService.send({ service: "budget", action: "getAll" }, {})
      );
    }
    return await firstValueFrom(
      this.budgetService.send(
        { service: "budget", action: "getAllByUser" },
        user.id
      )
    );
  }

  async getBudgetById(id: string, user) {
    const isAdmin = user.role === Role.ADMIN;
    const budget = await firstValueFrom(
      this.budgetService.send({ service: "budget", action: "getById" }, id)
    );
    if (!isAdmin && budget.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return budget;
  }

  async updateBudget(id: string, updateBudgetDto: UpdateBudgetDto, user) {
    const budget = await this.getBudgetById(id, user);
    updateBudgetDto.userId = budget.userId;
    return await firstValueFrom(
      this.budgetService.send(
        { service: "budget", action: "update" },
        { id, updateBudgetDto }
      )
    );
  }

  async deleteBudget(id: string, user) {
    const budget = await this.getBudgetById(id, user);
    return await firstValueFrom(
      this.budgetService.send({ service: "budget", action: "delete" }, id)
    );
  }
}

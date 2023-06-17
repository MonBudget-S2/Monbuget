import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateBudgetDto, UpdateBudgetDto } from "./budget.request";

@Injectable()
export class BudgetService {


  constructor(
    @Inject("BUDGET_SERVICE") private readonly budgetService: ClientProxy

  ) {}
    
  async createBudget(createBudgetDto: CreateBudgetDto) {
    return await firstValueFrom(
      this.budgetService.send(
        { service: "budget", cmd: "create" },
        { budget: createBudgetDto }
      )
    );
}
async getAllBudgets() {
    return await firstValueFrom(
      this.budgetService.send({ service: "budget", cmd: "getAll" }, {})
    );
  }

  async getBudgetById(id: string) {
    return await firstValueFrom(
      this.budgetService.send({ service: "budget", cmd: "getById" }, { id })
    );
  }

  async updateBudget(id: string, updateBudgetDto: UpdateBudgetDto) {
    return await firstValueFrom(
      this.budgetService.send({ service: "budget", cmd: "update" }, { id, budget: updateBudgetDto })
    );
  }

  async deleteBudget(id: string) {
    return await firstValueFrom(
      this.budgetService.send({ service: "budget", cmd: "delete" }, { id })
    );
  }
}


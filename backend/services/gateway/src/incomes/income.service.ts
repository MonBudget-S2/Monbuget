import { Inject, Injectable } from "@nestjs/common";

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateIncomeDto, UpdateIncomeDto } from "./income.request";

@Injectable()
export class IncomeService {
  constructor(
    @Inject("INCOME_SERVICE") private readonly incomeService: ClientProxy
  ) {}

  async createIncome(createIncomeDto: CreateIncomeDto) {
    return await firstValueFrom(
      this.incomeService.send(
        { service: "income", action: "create" },
        createIncomeDto
      )
    );
  }

  async getAllIncomes() {
    return await firstValueFrom(
      this.incomeService.send({ service: "income", action: "getAll" }, {})
    );
  }

  async getIncomeById(id: string) {
    return await firstValueFrom(
      this.incomeService.send({ service: "income", action: "getById" }, id)
    );
  }

  async updateIncome(id: string, updateIncomeDto: UpdateIncomeDto) {
    return await firstValueFrom(
      this.incomeService.send(
        { service: "income", action: "update" },
        { id, updateIncomeDto: updateIncomeDto }
      )
    );
  }

  async deleteIncome(id: string) {
    return await firstValueFrom(
      this.incomeService.send({ service: "income", action: "delete" }, id)
    );
  }
}

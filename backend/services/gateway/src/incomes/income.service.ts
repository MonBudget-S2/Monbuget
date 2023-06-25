import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateIncomeDto, UpdateIncomeDto } from "./income.request";
import { Role } from "src/authentication/authentication.enum";

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

  async getAllIncomes(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.incomeService.send({ service: "income", action: "getAll" }, {})
      );
    } else {
      return await firstValueFrom(
        this.incomeService.send(
          { service: "income", action: "getAllByUser" },
          user.id
        )
      );
    }
  }

  async getIncomeById(id: string, user) {
    const isAdmin = user.role === Role.ADMIN;
    const income = await firstValueFrom(
      this.incomeService.send({ service: "income", action: "getById" }, id)
    );
    if (!isAdmin && income.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return income;
  }

  async updateIncome(id: string, updateIncomeDto: UpdateIncomeDto, user) {
    //get income by id and check if user is owner of income
    const income = await this.getIncomeById(id, user);
    updateIncomeDto.userId = income.userId;
    return await firstValueFrom(
      this.incomeService.send(
        { service: "income", action: "update" },
        { id, updateIncomeDto }
      )
    );
  }

  async deleteIncome(id: string) {
    return await firstValueFrom(
      this.incomeService.send({ service: "income", action: "delete" }, id)
    );
  }

  async getAllIncomesByTypeForYear(user, year?: number) {
    const currentYear = year || new Date().getFullYear();
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.incomeService.send(
          { service: "income", action: "getAllIncomesByTypeForYear" },
          { currentYear }
        )
      );
    }

    return await firstValueFrom(
      this.incomeService.send(
        { service: "income", action: "getAllIncomesByTypeForYear" },
        { year: currentYear, userId: user.id }
      )
    );
  }
}

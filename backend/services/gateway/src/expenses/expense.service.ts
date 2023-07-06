import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateExpenseDto, UpdateExpenseDto } from "./expense.request";
import { Role } from "src/authentication/authentication.enum";

@Injectable()
export class ExpenseService {
  constructor(
    @Inject("EXPENSE_SERVICE") private readonly expenseService: ClientProxy
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto) {
    console.log("createExpenseDto", createExpenseDto);
    return await firstValueFrom(
      this.expenseService.send(
        { service: "expense", action: "create" },
        createExpenseDto
      )
    );
  }

  async uploadFacture(id,receiptImage){
    return await firstValueFrom(
        this.expenseService.send({ service:"expense", action:"uploadFacture"},{id,receiptImage})
    )
  }

  async getAllExpenses(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.expenseService.send({ service: "expense", action: "getAll" }, {})
      );
    } else {
      return await firstValueFrom(
        this.expenseService.send(
          { service: "expense", action: "getAllByUser" },
          user.id
        )
      );
    }
  }

  async getExpenseById(id: string, user) {
    const isAdmin = user.role === Role.ADMIN;
    const expense = await firstValueFrom(
      this.expenseService.send({ service: "expense", action: "getById" }, id)
    );
    if (!isAdmin && expense.userId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return expense;
  }

  async updateExpense(id: string, updateExpenseDto: UpdateExpenseDto, user) {
    //get expense by id and check if user is owner of expense
    const expense = await this.getExpenseById(id, user);
    updateExpenseDto.userId = expense.userId;
    return await firstValueFrom(
      this.expenseService.send(
        { service: "expense", action: "update" },
        { id, updateExpenseDto }
      )
    );
  }

  async deleteExpense(id: string, user) {
    const expense = await this.getExpenseById(id, user);
    return await firstValueFrom(
      this.expenseService.send({ service: "expense", action: "delete" }, id)
    );
  }

  async getAllExpensesByCategoryAndPeriod(user, year?: number, month?: number) {
    const currentYear = year || new Date().getFullYear();
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.expenseService.send(
          { service: "expense", action: "getTotalAmountByCategoryAndPeriod" },
          { year: currentYear, month }
        )
      );
    }

    return await firstValueFrom(
      this.expenseService.send(
        { service: "expense", action: "getTotalAmountByCategoryAndPeriod" },
        { userId: user.id, year: currentYear, month }
      )
    );
  }

  async getTotalAmountByPeriod(user, year?: number, month?: number) {
    const currentYear = year || new Date().getFullYear();
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.expenseService.send(
          { service: "expense", action: "getTotalAmountByPeriod" },
          { year: currentYear, month }
        )
      );
    }

    return await firstValueFrom(
      this.expenseService.send(
        { service: "expense", action: "getTotalAmountByPeriod" },
        { userId: user.id, year: currentYear, month }
      )
    );
  }
}

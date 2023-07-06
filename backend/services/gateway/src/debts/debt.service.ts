import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Role } from "src/authentication/authentication.enum";

@Injectable()
export class DebtService {
  constructor(
    @Inject("DEBT_SERVICE") private readonly debtService: ClientProxy
  ) {}

  async getAllDebts(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.debtService.send({ service: "debt", action: "getAll" }, {})
      );
    } else {
      return await firstValueFrom(
        this.debtService.send(
          { service: "debt", action: "getAllByDebtor" },
          user.id
        )
      );
    }
  }

  async getAllReceivedDebts(user) {
    const isAdmin = user.role === Role.ADMIN;
    if (isAdmin) {
      return await firstValueFrom(
        this.debtService.send({ service: "debt", action: "getAll" }, {})
      );
    } else {
      return await firstValueFrom(
        this.debtService.send(
          { service: "debt", action: "getAllByCreditor" },
          user.id
        )
      );
    }
  }

  async getDebtById(id: string, user) {
    const isAdmin = user.role === Role.ADMIN;
    const debt = await firstValueFrom(
      this.debtService.send({ service: "debt", action: "getById" }, id)
    );
    if (!debt) {
      throw new HttpException("Debt not found", HttpStatus.NOT_FOUND);
    }
    if (!isAdmin && debt.debtorId !== user.id && debt.creditorId !== user.id) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return debt;
  }

  async payDebt(id: string, amount: number, user) {
    const debt = await this.getDebtById(id, user);
    return await firstValueFrom(
      this.debtService.send(
        { service: "debt", action: "pay" },
        { debtId: id, amount: amount }
      )
    );
  }
}

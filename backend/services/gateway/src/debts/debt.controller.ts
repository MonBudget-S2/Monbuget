import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { DebtService } from "././debt.service";
import {
  AuthenticationRequired,
  HasRole,
} from "src/authentication/authentication.decorator";

@AuthenticationRequired()
@Controller("debts")
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Get()
  async getAllDebts(@Req() request: CustomRequest) {
    const user = request.user;
    return this.debtService.getAllDebts(user);
  }

  @Get(":id")
  async getDebtById(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.debtService.getDebtById(id, user);
  }

  @Patch(":id/pay")
  async payDebt(
    @Param("id") id: string,
    @Body("amount") amount: number,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.debtService.payDebt(id, amount, user);
  }
}

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
import { BudgetService } from "./budget.service";
import { CreateBudgetDto, UpdateBudgetDto } from "./budget.request";
import { AuthenticationRequired } from "src/authentication/authentication.decorator";

@AuthenticationRequired()
@Controller("budgets")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  createBudget(
    @Body() createBudgetDto: CreateBudgetDto,
    @Req() request: CustomRequest
  ) {
    createBudgetDto.userId = request.user.id;
    return this.budgetService.createBudget(createBudgetDto);
  }

  @Get()
  getAllBudgets(@Req() request: CustomRequest) {
    const user = request.user;
    return this.budgetService.getAllBudgets(user);
  }

  @Get(":id")
  getBudgetById(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.budgetService.getBudgetById(id, user);
  }

  @Put(":id")
  updateBudget(
    @Param("id") id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.budgetService.updateBudget(id, updateBudgetDto, user);
  }

  @Delete(":id")
  deleteBudget(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.budgetService.deleteBudget(id, user);
  }
}

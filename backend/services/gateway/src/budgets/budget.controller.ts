import { Controller, Post, Body, UseGuards, Get, Put, Delete, Param } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.request';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller("budgets")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  createBudget(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.createBudget(createBudgetDto);
  }

  @Get()
  getAllBudgets() {
    return this.budgetService.getAllBudgets();
  }

  @Get(":id")
  getBudgetById(@Param("id") id: string) {
    return this.budgetService.getBudgetById(id);
  }

  @Put(":id")
  updateBudget(@Param("id") id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.updateBudget(id, updateBudgetDto);
  }

  @Delete(":id")
  deleteBudget(@Param("id") id: string) {
    return this.budgetService.deleteBudget(id);
  }

}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { IncomeService } from "./income.service";
import { CreateIncomeDto, UpdateIncomeDto } from "./income.request";
import { UpdateCategoryDto } from "../categories/category.request";
import {
  AuthenticationRequired,
  HasRole,
} from "src/authentication/authentication.decorator";
import { Role } from "src/authentication/authentication.enum";

@AuthenticationRequired()
@Controller("incomes")
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  createIncome(
    @Body() createIncomeDto: CreateIncomeDto,
    @Req() request: CustomRequest
  ) {
    createIncomeDto.userId = request.user.id;
    return this.incomeService.createIncome(createIncomeDto);
  }

  @Get()
  getAllIncomes(@Req() request: CustomRequest) {
    const user = request.user;
    return this.incomeService.getAllIncomes(user);
  }

  @Get(":id")
  getIncomeById(@Param("id") id: string) {
    return this.incomeService.getIncomeById(id);
  }

  @Put(":id")
  updateIncome(
    @Param("id") id: string,
    @Body() updateIncomeDto: UpdateIncomeDto
  ) {
    return this.incomeService.updateIncome(id, updateIncomeDto);
  }

  @Delete(":id")
  deleteIncome(@Param("id") id: string) {
    return this.incomeService.deleteIncome(id);
  }

  @Get("types/:year")
  getAllIncomesByTypeForYear(
    @Param("year") year: number,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.incomeService.getAllIncomesByTypeForYear(user, year);
  }
}

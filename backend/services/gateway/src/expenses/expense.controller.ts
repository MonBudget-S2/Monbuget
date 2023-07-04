import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,UseInterceptors,UploadedFile,

} from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto, UpdateExpenseDto } from "./expense.request";
import {
  AuthenticationRequired,
  HasRole,
} from "src/authentication/authentication.decorator";
import { Role } from "src/authentication/authentication.enum";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {Express} from "express";


@AuthenticationRequired()
@Controller("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads',
      filename: (req,file,callback) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = extname(file.originalname);
        callback(null, `${uniqueSuffix}${extension}`);
      },
    })
  }))
  createExpense(
    @UploadedFile() file : Express.Multer.File,
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() request: CustomRequest
  ) {
    console.log("dto",createExpenseDto);
    createExpenseDto.userId = request.user.id;
    createExpenseDto.receiptImage = file.filename;
    return this.expenseService.createExpense(createExpenseDto);
  }

  @Get()
  getAllExpenses(@Req() request: CustomRequest) {
    const user = request.user;
    return this.expenseService.getAllExpenses(user);
  }

  @Get(":id")
  getExpenseById(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.expenseService.getExpenseById(id, user);
  }

  @Put(":id")
  updateExpense(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.expenseService.updateExpense(id, updateExpenseDto, user);
  }

  @Delete(":id")
  deleteExpense(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.expenseService.deleteExpense(id, user);
  }

  @Get("categories/:year/:month?")
  getAllExpensesByCategoryAndPeriod(
    @Req() request: CustomRequest,
    @Param("year", ParseIntPipe) year: number,
    @Param("month") month?: string
  ) {
    let parsedMonth: number | undefined;

    if (month !== undefined) {
      parsedMonth = parseInt(month, 10);

      // Validate month parameter
      if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        throw new BadRequestException(
          "Invalid month parameter. Month must be a valid number between 1 and 12."
        );
      }
    }
    const user = request.user;
    return this.expenseService.getAllExpensesByCategoryAndPeriod(
      user,
      year,
      parsedMonth
    );
  }

  @Get("total/:year/:month?")
  getAllExpensesByPeriod(
    @Req() request: CustomRequest,
    @Param("year", ParseIntPipe) year: number,
    @Param("month") month?: string
  ) {
    let parsedMonth: number | undefined;

    if (month !== undefined) {
      parsedMonth = parseInt(month, 10);

      // Validate month parameter
      if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        throw new BadRequestException(
          "Invalid month parameter. Month must be a valid number between 1 and 12."
        );
      }
    }
    const user = request.user;
    return this.expenseService.getTotalAmountByPeriod(user, year, parsedMonth);
  }
}

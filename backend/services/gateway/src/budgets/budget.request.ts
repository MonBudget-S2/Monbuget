import { IsString, IsNumber, IsDate } from "class-validator";

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  userId: string;

  @IsString()
  categoryId: string;
}

export class UpdateBudgetDto {
  @IsString()
  name?: string;

  @IsNumber()
  amount?: number;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;

  @IsString()
  userId?: string;

  @IsString()
  categoryId?: string;
}

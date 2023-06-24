import { IsString, IsDate } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  type: string;

  @IsString()
  severity: string;

  @IsString()
  message: string;

  @IsDate()
  readAt: Date;

  @IsString()
  userId: string;
}

export class UpdateCategoryDto {
  @IsString()
  type?: string;

  @IsString()
  severity?: string;

  @IsString()
  message?: string;

  @IsDate()
  readAt?: Date;

  @IsString()
  userId?: string;
}

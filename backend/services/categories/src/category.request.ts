import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  userId?: string;
}

export class UpdateCategoryDto {
  @IsString()
  name?: string;

  @IsString()
  userId?: string;
}

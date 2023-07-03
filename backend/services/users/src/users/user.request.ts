import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;
}

export class UpdateUserDto {
  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;

  @IsString()
  username?: string;

  @IsEmail()
  email?: string;
}

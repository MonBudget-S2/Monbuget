import { IsString, IsEmail, IsBoolean, IsNumber, IsEnum } from 'class-validator';


export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;


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

  @IsString()
  password?: string;

  @IsBoolean()
  isVerified?: boolean;

  @IsNumber()
  balance?: number;

}

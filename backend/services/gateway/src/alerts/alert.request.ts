import { IsString, IsDate } from 'class-validator';

export class CreateAlertDto {
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

export class UpdateAlertDto {
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

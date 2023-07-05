import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateMeetingDto {
  @IsUUID()
  advisorId: string;

  @IsUUID()
  clientId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

export class UpdateMeetingDto {
  @IsOptional()
  @IsUUID()
  advisorId?: string;

  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}

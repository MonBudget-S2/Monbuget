import { IsUUID, IsDateString, IsOptional, IsEnum } from "class-validator";
import { DayOfWeek } from "./meeting.enum";

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

export class CreateScheduleDto {
  @IsUUID()
  advisorId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

export class UpdateScheduleDto {
  @IsUUID()
  advisorId: string;

  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsDateString()
  startTime?: string;

  @IsDateString()
  endTime?: string;
}

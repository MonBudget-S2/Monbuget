import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  CreateMeetingDto,
  CreateScheduleDto,
  UpdateMeetingDto,
} from './meeting.request';
import { DayOfWeek } from './meeting.enum';

@Controller('meeting')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'meeting', action: 'create' })
  createMeeting(createMeetingDto: CreateMeetingDto) {
    return this.appService.createMeeting(createMeetingDto);
  }

  @MessagePattern({ service: 'meeting', action: 'getAll' })
  getAllMeetings() {
    return this.appService.getAllMeetings();
  }

  @MessagePattern({ service: 'meeting', action: 'getById' })
  getMeetingById(id: string) {
    return this.appService.getMeetingById(id);
  }

  @MessagePattern({ service: 'meeting', action: 'update' })
  updateMeeting(
    @Payload() payload: { id: string; updateMeetingDto: UpdateMeetingDto },
  ) {
    const { id, updateMeetingDto } = payload;
    console.log('updateMeetingDto', updateMeetingDto);
    return this.appService.updateMeeting(id, updateMeetingDto);
  }

  @MessagePattern({ service: 'meeting', action: 'delete' })
  deleteMeeting(id: string) {
    return this.appService.deleteMeeting(id);
  }

  /**** Schedules  ****/

  @MessagePattern({ service: 'meeting', action: 'createSchedule' })
  createSchedule(createScheduleDto: CreateScheduleDto) {
    console.log('createScheduleDto', createScheduleDto);
    return this.appService.createSchedule(createScheduleDto);
  }

  @MessagePattern({ service: 'meeting', action: 'getAllSchedules' })
  getAllSchedules() {
    return this.appService.getAllSchedules();
  }

  @MessagePattern({ service: 'meeting', action: 'getAllSchedulesByAdvisor' })
  getAllSchedulesByAdvisor(advisorId: string) {
    return this.appService.getAllSchedulesByAdvisor(advisorId);
  }

  @MessagePattern({ service: 'meeting', action: 'getSchedulesByDay' })
  getScheduleByDay(day: DayOfWeek) {
    return this.appService.getScheduleByDay(day);
  }

  @MessagePattern({ service: 'meeting', action: 'updateSchedulesByDay' })
  updateSchedulesByDay(
    @Payload()
    payload: {
      schedules: { dayOfWeek: DayOfWeek; startTime: string; endTime: string }[];
    },
  ) {
    const { schedules } = payload;
    return this.appService.updateSchedulesByDay(schedules);
  }
}

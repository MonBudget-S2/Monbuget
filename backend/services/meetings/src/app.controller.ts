import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  CreateMeetingDto,
  CreateScheduleDto,
  UpdateMeetingDto,
  UpdateScheduleDto,
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

  @MessagePattern({ service: 'meeting', action: 'getAllMeetingsByAdvisor' })
  getAllMeetingsByAdvisor(advisorId: string) {
    return this.appService.getAllMeetingsByAdvisor(advisorId);
  }

  @MessagePattern({ service: 'meeting', action: 'getAllMeetingsByClient' })
  getAllMeetingsByClient(clientId: string) {
    return this.appService.getAllMeetingsByClient(clientId);
  }

  @MessagePattern({ service: 'meeting', action: 'getMeetingById' })
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

  @MessagePattern({
    service: 'meeting',
    action: 'getAvailabilityForAppointment',
  })
  getAvailablityForAppointment(advisorId: string) {
    return this.appService.getAvailabilityForAppointment(advisorId);
  }

  /****  video ***/
  @MessagePattern({ service: 'meeting', action: 'generateMeetingToken' })
  generateVideoToken(meetingId: string) {
    return this.appService.generateVideoToken(meetingId);
  }

  @MessagePattern({ service: 'meeting', action: 'validateMeetingToken' })
  validateMeeting(@Payload() payload: { meetingId: string; token: string }) {
    const { meetingId, token } = payload;
    return this.appService.validateMeeting(meetingId, token);
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
      advisorId: string;
      schedules: UpdateScheduleDto[];
    },
  ) {
    const { advisorId, schedules } = payload;
    console.log('updateSchedulesByDay', schedules);
    // schedules.forEach((schedule) => {
    //   console.log('schedule', schedule);
    // });
    return this.appService.updateSchedulesByDay(advisorId, schedules);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import {
  CreateMeetingDto,
  CreateScheduleDto,
  UpdateMeetingDto,
  UpdateScheduleDto,
} from './meeting.request';
import { Schedule } from './schedule.entity';
import { DayOfWeek } from './meeting.enum';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async createMeeting(createMeetingDto: CreateMeetingDto): Promise<any> {
    const newMeeting = this.meetingRepository.create(createMeetingDto);
    await this.meetingRepository.save(newMeeting);
    return { message: 'Meeting created successfully', newMeeting };
  }

  async getMeetingById(id: string): Promise<Meeting | null> {
    return this.meetingRepository.findOneBy({ id });
  }

  async getAllMeetings(): Promise<Meeting[]> {
    return this.meetingRepository.find();
  }

  async updateMeeting(
    id: string,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<Meeting | null> {
    console.log('updateMeetingDto', updateMeetingDto);
    const meeting = await this.meetingRepository.findOneBy({ id });
    if (!meeting) {
      throw new RpcException('Meeting not found');
    }
    const updatedMeeting = await this.meetingRepository.save({
      ...meeting,
      ...updateMeetingDto,
    });

    console.log('updatedMeeting', updatedMeeting);

    return updatedMeeting;
  }

  async deleteMeeting(id: string): Promise<boolean> {
    const result = await this.meetingRepository.delete(id);
    return result.affected > 0;
  }

  /**** Schedules  ****/

  async createSchedule(createScheduleDto: CreateScheduleDto): Promise<any> {
    const newSchedule = this.scheduleRepository.create(createScheduleDto);
    const res = await this.scheduleRepository.save(newSchedule);
    console.log('res', res);
    return { message: 'Schedule created successfully', res };
  }

  async getAllSchedules(): Promise<any> {
    return this.scheduleRepository.find();
  }

  async getAllSchedulesByAdvisor(advisorId: string): Promise<any> {
    const schedules = await this.scheduleRepository.find({
      where: { advisorId },
    });

    const desiredOrder = [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
      DayOfWeek.SUNDAY,
    ];

    // Sort the schedules based on the desired order
    const sortedSchedules = schedules.sort((a, b) => {
      const dayA = desiredOrder.indexOf(a.dayOfWeek);
      const dayB = desiredOrder.indexOf(b.dayOfWeek);
      return dayA - dayB;
    });

    return sortedSchedules;
  }

  async getScheduleByDay(dayOfWeek: DayOfWeek): Promise<any> {
    return this.scheduleRepository.find({ where: { dayOfWeek } });
  }

  async updateSchedulesByDay(
    advisorId: string,
    schedules: UpdateScheduleDto[],
  ): Promise<any> {
    // Find all schedules for the user
    const existingSchedules = await this.scheduleRepository.find({
      where: { advisorId: advisorId },
    });

    // Map existing schedules by dayOfWeek for easier lookup
    const existingSchedulesByDay: { [key in DayOfWeek]?: Schedule } = {};
    existingSchedules.forEach((schedule) => {
      existingSchedulesByDay[schedule.dayOfWeek] = schedule;
    });

    for (const schedule of schedules) {
      const { dayOfWeek, startTime, endTime } = schedule;
      const existingSchedule = existingSchedulesByDay[dayOfWeek];

      if (existingSchedule) {
        // Update the existing schedule with the provided data
        existingSchedule.startTime = startTime;
        existingSchedule.endTime = endTime;
        await this.scheduleRepository.save(existingSchedule);
      } else {
        // Create a new schedule if it doesn't exist for the specified dayOfWeek
        const newScheduleData = {
          advisorId: advisorId, // Set the advisor ID
          dayOfWeek,
          startTime,
          endTime,
        };
        const newSchedule = this.scheduleRepository.create(newScheduleData);
        await this.scheduleRepository.save(newSchedule);
      }
    }
    return { message: 'Schedules updated successfully' };
    // ...
  }
}

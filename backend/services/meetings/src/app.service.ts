import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import {
  CreateMeetingDto,
  CreateScheduleDto,
  UpdateMeetingDto,
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
    await this.scheduleRepository.save(newSchedule);
    return { message: 'Schedule created successfully', newSchedule };
  }

  async getAllSchedules(): Promise<any> {
    return this.scheduleRepository.find();
  }

  async getScheduleByDay(dayOfWeek: DayOfWeek): Promise<any> {
    return this.scheduleRepository.find({ where: { dayOfWeek } });
  }

  async updateSchedulesByDay(
    schedules: { dayOfWeek: DayOfWeek; startTime: string; endTime: string }[],
  ): Promise<any> {
    for (const schedule of schedules) {
      const { dayOfWeek, startTime, endTime } = schedule;
      const existingSchedule = await this.scheduleRepository.findOne({
        where: { dayOfWeek },
      });
      if (existingSchedule) {
        // Update the existing schedule with the provided data
        existingSchedule.startTime = startTime;
        existingSchedule.endTime = endTime;
        await this.scheduleRepository.save(existingSchedule);
      } else {
        // Create a new schedule if it doesn't exist for the specified dayOfWeek
        const newSchedule = this.scheduleRepository.create({
          dayOfWeek,
          startTime,
          endTime,
        });
        await this.scheduleRepository.save(newSchedule);
      }
    }
    // ...
  }
}

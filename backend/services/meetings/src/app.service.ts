import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { Between, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import {
  CreateMeetingDto,
  CreateScheduleDto,
  UpdateMeetingDto,
  UpdateScheduleDto,
} from './meeting.request';
import { Schedule } from './schedule.entity';
import { DayOfWeek, MeetingRequestStatus } from './meeting.enum';
import {
  addDays,
  addHours,
  addWeeks,
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
  format,
  getHours,
  getMinutes,
  getSeconds,
  isAfter,
  isBefore,
  isSameDay,
  isSameHour,
  isWithinInterval,
  parse,
  set,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  private readonly API_KEY = process.env.API_KEY;
  private readonly SECRET_KEY = process.env.SECRET_KEY;
  private readonly VIDEOSDK_API_ENDPOINT = process.env.VIDEOSDK_API_ENDPOINT;

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

  async getAllMeetingsByAdvisor(advisorId: string): Promise<Meeting[]> {
    return this.meetingRepository.find({ where: { advisorId } });
  }

  async getAllMeetingsByClient(clientId: string): Promise<Meeting[]> {
    return this.meetingRepository.find({ where: { clientId } });
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

  async createRoom(meetingId: string): Promise<any> {
    const meeting = await this.getMeetingById(meetingId);
    if (!meeting) {
      throw new RpcException('Meeting not found');
    }

    // Create meeting room
    const token = jwt.sign(
      {
        apikey: this.API_KEY,
        permissions: ['allow_join'],
      },
      this.SECRET_KEY,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuidv4(),
      },
    );

    console.log('token', token);

    const url = `${this.VIDEOSDK_API_ENDPOINT}/api/meetings`;
    const options = {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId: meetingId }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log('result', result);
      // Check if meeting room creation was successful
      if (!result.userId) {
        throw new RpcException('Failed to create meeting room');
      }
    } catch (error) {
      console.error('error', error);
      throw new RpcException('Failed to create meeting room');
    }

    return { message: 'Meeting room created successfully' };
  }

  async deleteMeeting(id: string): Promise<boolean> {
    const result = await this.meetingRepository.delete(id);
    return result.affected > 0;
  }

  /***** Video *****/

  async generateVideoToken(meetingId: string): Promise<any> {
    const token = jwt.sign(
      {
        apikey: this.API_KEY,
        permissions: ['allow_join'],
      },
      this.SECRET_KEY,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuidv4(),
      },
    );

    return token;
  }

  async validateMeeting(meetingId: string, token: string): Promise<any> {
    const meeting = await this.getMeetingById(meetingId);
    if (!meeting) {
      throw new Error('Meeting not found');
    }

    const decodedToken: any = jwt.verify(token, this.SECRET_KEY);

    if (decodedToken.apikey !== this.API_KEY) {
      throw new Error('Invalid API key');
    }

    if (!decodedToken.permissions.includes('allow_join')) {
      throw new Error('Insufficient permissions');
    }

    return {
      meetingId: meeting.id,
      isValid: true,
    };
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

  async getAvailabilityForAppointment(advisorId: string): Promise<Date[]> {
    const schedules = await this.scheduleRepository.find({
      where: { advisorId },
    });

    const startDate = startOfWeek(new Date());
    const endDate = endOfWeek(addWeeks(startDate, 2));

    const availability: Date[] = [];

    const currentDate = startDate;
    const bookedMeetings = await this.meetingRepository.find({
      where: {
        advisorId,
        status: MeetingRequestStatus.ACCEPTED,
        startTime: Between(startOfDay(startDate), endOfDay(endDate)),
      },
    });

    console.log('bookedMeetings', bookedMeetings);

    while (currentDate <= endDate) {
      const currentDayOfWeek = format(currentDate, 'EEEE', {
        locale: enUS,
      });

      const currentSchedule = schedules.find(
        (schedule) => schedule.dayOfWeek === currentDayOfWeek,
      );

      if (currentSchedule) {
        const startTime = parse(
          currentSchedule.startTime,
          'HH:mm:ss',
          new Date(),
        );
        const endTime = parse(currentSchedule.endTime, 'HH:mm:ss', new Date());

        const slots: Date[] = [];
        let currentTime = set(currentDate, {
          hours: getHours(startTime),
          minutes: getMinutes(startTime),
          seconds: getSeconds(startTime),
        });

        while (
          isBefore(
            currentTime,
            set(currentDate, {
              hours: getHours(endTime),
              minutes: getMinutes(endTime),
              seconds: getSeconds(endTime),
            }),
          )
        ) {
          if (isAfter(currentTime, new Date())) {
            // Exclude past date and time slots
            slots.push(currentTime);
          }
          currentTime = addHours(currentTime, 1);
        }

        const currentDateMeetings = bookedMeetings.filter((meeting) =>
          isSameDay(new Date(meeting.startTime), currentDate),
        );

        const bookedSlots = currentDateMeetings.reduce((slots, meeting) => {
          const meetingStartTime = new Date(meeting.startTime);
          const meetingEndTime = new Date(meeting.endTime);
          const slot = set(currentDate, {
            hours: getHours(meetingStartTime),
            minutes: getMinutes(meetingStartTime),
            seconds: getSeconds(meetingStartTime),
          });
          slots.push(slot);
          return slots;
        }, []);

        const availableSlots = slots.filter((slot) => {
          return !bookedSlots.some((bookedSlot) =>
            isSameHour(slot, bookedSlot),
          );
        });

        availability.push(...availableSlots);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return availability;
  }
}

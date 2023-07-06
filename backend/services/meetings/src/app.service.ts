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

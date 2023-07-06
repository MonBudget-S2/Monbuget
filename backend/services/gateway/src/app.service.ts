import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { CreateUserDto } from "./users/user.request";
import { Role } from "./authentication/authentication.enum";
import { DayOfWeek, MeetingRequestStatus } from "./meeting.enum";
import { UpdateScheduleDto } from "./meeting.request";

@Injectable()
export class AppService {
  constructor(
    @Inject("USER_SERVICE") private readonly authService: ClientProxy,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy,
    @Inject("MEETING_SERVICE") private readonly meetingService: ClientProxy
  ) {}

  async login(data: { username: string; password: string }) {
    Logger.log("Login request", "***********AppService***********");
    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "login" }, data)
    );
  }

  async validateToken(token: string) {
    const data = { token: token };

    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "validateToken" }, data)
    );
  }

  async register(createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "register" }, createUserDto)
    );
  }

  // Other API Gateway methods...

  async createAdvisor(createAdvisorDto: CreateUserDto) {
    const weekdays = [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
    ];

    const advisor = await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "createAdvisor" },
        createAdvisorDto
      )
    );

    console.log("Advisor created************", advisor);

    const weekdayPromises = weekdays.map(async (day) => {
      const startTime = "09:00"; // Set the desired start time
      const endTime = "18:00"; // Set the desired end time

      const createScheduleDto = {
        dayOfWeek: day,
        startTime,
        endTime,
        advisorId: advisor.id, // Assuming you have the advisor ID available here
      };

      await lastValueFrom(
        this.meetingService.send(
          { service: "meeting", action: "createSchedule" },
          createScheduleDto
        )
      );
    });

    await Promise.all(weekdayPromises);

    const weekends = [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];

    const weekendPromises = weekends.map(async (day) => {
      const createScheduleDto = {
        dayOfWeek: day,
        startTime: null,
        endTime: null,
        advisorId: advisor.id, // Assuming you have the advisor ID available here
      };

      await lastValueFrom(
        this.meetingService.send(
          { service: "meeting", action: "createSchedule" },
          createScheduleDto
        )
      );
    });

    console.log(await Promise.all(weekendPromises));
  }

  async getAllAdvisors() {
    return await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "getUsersByRole" },
        Role.ADVISOR
      )
    );
  }

  async getAllMeetingsByUser(user) {
    if (user.role === Role.ADVISOR) {
      return await firstValueFrom(
        this.meetingService.send(
          { service: "meeting", action: "getAllMeetingsByAdvisor" },
          user.id
        )
      );
    } else {
      return await firstValueFrom(
        this.meetingService.send(
          { service: "meeting", action: "getAllMeetingsByClient" },
          user.id
        )
      );
    }
  }

  async createMeeting(startTime: Date, advisorId: string, clientId: string) {
    const data: any = {
      startTime,
      advisorId,
      clientId,
    };
    const endTime = new Date(data.startTime);
    endTime.setHours(endTime.getHours() + 1);
    data.endTime = endTime;
    return await firstValueFrom(
      this.meetingService.send({ service: "meeting", action: "create" }, data)
    );
  }

  async getMeetingById(meetingId: string, user) {
    const meeting = await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "getMeetingById" },
        { meetingId, advisorId: user.id }
      )
    );
    if (!meeting) {
      throw new HttpException("Meeting not found", HttpStatus.NOT_FOUND);
    }

    if (meeting.clientId !== user.id && meeting.advisorId !== user.id) {
      throw new HttpException(
        "You are not authorized to view this meeting",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  async approveMeeting(meetingId: string) {
    return await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "update" },
        {
          meetingId,
          updateMeetingDto: { status: MeetingRequestStatus.ACCEPTED },
        }
      )
    );
  }

  async getAvailabilityForAppointment(advisorId: string) {
    return await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "getAvailabilityForAppointment" },
        advisorId
      )
    );
  }

  async getAdvisorSchedule(advisorId: string) {
    return await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "getAllSchedulesByAdvisor" },
        advisorId
      )
    );
  }

  async updateAdvisorSchedule(schedules: UpdateScheduleDto[], user) {
    if (schedules.length === 0) {
      return Error("No schedules to update");
    }
    return await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "updateSchedulesByDay" },
        { advisorId: user.id, schedules: schedules }
      )
    );
  }
}

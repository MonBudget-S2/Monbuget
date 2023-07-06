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
    let meetings = [];
    if (user.role === Role.ADVISOR) {
      meetings = await firstValueFrom(
        this.meetingService.send(
          { service: "meeting", action: "getAllMeetingsByAdvisor" },
          user.id
        )
      );
    } else {
      meetings = await firstValueFrom(
        this.meetingService.send(
          { service: "meeting", action: "getAllMeetingsByClient" },
          user.id
        )
      );
    }
    const meetingPromises = meetings.map(async (meeting) => {
      const advisor = await firstValueFrom(
        this.userService.send(
          { service: "user", cmd: "getUserById" },
          meeting.advisorId
        )
      );
      const client = await firstValueFrom(
        this.userService.send(
          { service: "user", cmd: "getUserById" },
          meeting.clientId
        )
      );
      meeting.advisor = advisor;
      meeting.client = client;
      return meeting;
    });
    return await Promise.all(meetingPromises);
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
        meetingId
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

    const advisor = await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "getUserById" },
        meeting.advisorId
      )
    );

    const client = await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "getUserById" },
        meeting.clientId
      )
    );

    meeting.advisor = advisor;
    meeting.client = client;

    return meeting;
  }

  getMeetingToken = async (meetingId: string, user) => {
    const meeting = await this.getMeetingById(meetingId, user);
    if (meeting.status !== MeetingRequestStatus.ACCEPTED) {
      throw new HttpException(
        "Meeting is not approved yet",
        HttpStatus.UNAUTHORIZED
      );
    }
    //check meetig starttime is less than current time - 15 min
    // const startTime = new Date(meeting.startTime);
    // const currentTime = new Date();
    // const diff = (startTime.getTime() - currentTime.getTime()) / 1000;
    // const diffInMinutes = Math.abs(Math.round(diff / 60));
    // if (diffInMinutes > 15) {
    //   throw new HttpException(
    //     "Meeting is not started yet",
    //     HttpStatus.UNAUTHORIZED
    //   );
    // }

    const token = await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "generateMeetingToken" },
        meetingId
      )
    );
    return token;
  };

  async validateMeetingToken(meetingId: string, token: string, user) {
    const meeting = await this.getMeetingById(meetingId, user);
    return await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "validateMeetingToken" },
        { meetingId, token }
      )
    );
  }

  async approveMeeting(meetingId: string, user) {
    console.log(meetingId);
    const meeting = await this.getMeetingById(meetingId, user);
    console.log("************************************");
    const approved = await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "update" },
        {
          meetingId,
          updateMeetingDto: { status: MeetingRequestStatus.ACCEPTED },
        }
      )
    );

    const room = await firstValueFrom(
      this.meetingService.send(
        { service: "meeting", action: "createRoom" },
        meetingId
      )
    );
    console.log("ROOM", room);
    console.log("test******************", approved);

    return approved;
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

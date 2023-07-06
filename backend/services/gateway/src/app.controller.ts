import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";
import {
  AuthenticationRequired,
  HasRole,
} from "./authentication/authentication.decorator";
import { Role } from "./authentication/authentication.enum";
import { CreateUserDto } from "./users/user.request";
import { UpdateScheduleDto } from "./meeting.request";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("users/login")
  login(@Payload() data: { username: string; password: string }) {
    return this.appService.login(data);
  }

  @Post("users/validateToken")
  validateToken(@Payload() data: { token: string }) {
    return this.appService.validateToken(data.token);
  }

  @Post("users/register")
  register(
    @Payload()
    createUserDto: CreateUserDto
  ) {
    return this.appService.register(createUserDto);
  }

  // Other API Gateway methods...

  @Post("/advisors")
  @AuthenticationRequired()
  @HasRole(Role.ADMIN)
  createAdvisor(
    @Payload()
    createUserDto: CreateUserDto
  ) {
    return this.appService.createAdvisor(createUserDto);
  }
  @Get("/advisors")
  @AuthenticationRequired()
  getAllAdvisors() {
    return this.appService.getAllAdvisors();
  }

  @Get("meetings")
  @AuthenticationRequired()
  getAllMeetings(@Req() request: CustomRequest) {
    return this.appService.getAllMeetingsByUser(request.user);
  }
  @Post("meetings")
  @AuthenticationRequired()
  createMeeting(
    @Payload()
    data: {
      startTime: Date;
      advisorId?: string;
      clientId?: string;
    },
    @Req() request: CustomRequest
  ): Promise<any> {
    if (request.user.role == Role.ADVISOR) {
      data.advisorId = request.user.id;
    } else if (request.user.role == Role.USER) {
      data.clientId = request.user.id;
    }

    return this.appService.createMeeting(
      data.startTime,
      data.advisorId,
      data.clientId
    );
  }

  @Get("meetings/:id")
  @AuthenticationRequired()
  getMeeting(@Param("id") id: string, @Req() request: CustomRequest) {
    return this.appService.getMeetingById(id, request.user);
  }

  @Patch("meetings/:id/approve")
  @AuthenticationRequired()
  @HasRole(Role.ADVISOR)
  approveMeeting(@Payload() data: { id: string }) {
    return this.appService.approveMeeting(data.id);
  }

  @Get("advisors/:id/availability-for-appointment")
  @AuthenticationRequired()
  getAvailabilityForAppointment(
    @Param("id") id: string,
    @Req() request: CustomRequest
  ) {
    return this.appService.getAvailabilityForAppointment(id);
  }

  @Get("advisors/schedules")
  @AuthenticationRequired()
  @HasRole(Role.ADVISOR)
  getAdvisorSchedule(@Req() request: CustomRequest) {
    return this.appService.getAdvisorSchedule(request.user.id);
  }

  @Patch("advisors/schedules")
  @AuthenticationRequired()
  @HasRole(Role.ADVISOR)
  updateAdvisorSchedule(
    @Payload()
    data,
    @Req() request: CustomRequest
  ) {
    console.log("data", data);
    const schedules: UpdateScheduleDto[] = data?.schedules;
    console.log("schedules", schedules);
    return this.appService.updateAdvisorSchedule(schedules, request.user);
  }
}

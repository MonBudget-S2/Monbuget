
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

  @Post('users/confirm/:token')
  confirmEmailAddress(@Param('token') token:string){
    return this.appService.confirmEmailAddress(token);
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

    console.log("data", data);

    return this.appService.createMeeting(
      data.startTime,
      data.advisorId,
      data.clientId
    );
  }

  @Get("meetings/:id")
  @AuthenticationRequired()
  getMeeting(@Param("id") id: string, @Req() request: CustomRequest) {
    console.log("id", id);
    console.log("**************", request.user);
    return this.appService.getMeetingById(id, request.user);
  }

  @Get("meetings/:id/token")
  @AuthenticationRequired()
  getMeetingToken(@Param("id") id: string, @Req() request: CustomRequest) {
    return this.appService.getMeetingToken(id, request.user);
  }

  @Post("meetings/:id/validateMeetingToken")
  @AuthenticationRequired()
  validateMeetingToken(
    @Param("id") id: string,
    @Payload() data: { token: string },
    @Req() request: CustomRequest
  ) {
    return this.appService.validateMeetingToken(id, data.token, request.user);
  }

  @Patch("meetings/:id/approve")
  @AuthenticationRequired()
  @HasRole(Role.ADVISOR)
  approveMeeting(@Param("id") id: string, @Req() request: CustomRequest) {
    return this.appService.approveMeeting(id, request.user);
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

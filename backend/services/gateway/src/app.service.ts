import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateUserDto } from "./users/user.request";
import { Role } from "./authentication/authentication.enum";

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

  async getAllAdvisors() {
    return await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "getUsersByRole" },
        Role.ADVISOR
      )
    );
  }

  async createMeeting(data: {
    startTime: Date;
    endTime: Date;
    advisorId: string;
    clientId: string;
  }) {
    return await firstValueFrom(
      this.meetingService.send({ service: "meeting", action: "create" }, data)
    );
  }
}

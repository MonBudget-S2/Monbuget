import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("users/login")
  login(@Payload() data: { username: string; password: string }) {
    return this.appService.login(data);
  }

  @Post("users/register")
  register(
    @Payload()
    data: {
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    }
  ) {
    return this.appService.register(data);
  }

  @Get("users")
  getUsers() {
    return this.appService.getUsers();
  }
  // @UseGuards(JwtAuthGuard)
  // @MessagePattern({ service: "user", action: "profile" })

  getUserProfile(@Payload() data: { userId: string }) {
    return this.appService.getUserProfile(data.userId);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ service: "income", action: "create" })
  createIncome(@Payload() data: { userId: string; amount: number }) {
    return this.appService.createIncome(data.userId, data.amount);
  }

  // Other API Gateway methods...
}

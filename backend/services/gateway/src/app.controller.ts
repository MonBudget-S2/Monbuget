import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AuthenticationRequired } from "./authentication/authentication.decorator";

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



  // @UseGuards(JwtAuthGuard)
 @AuthenticationRequired()
  @Get("users")
  getUsers() {
    return this.appService.getUsers();
  }
  // @MessagePattern({ service: "user", action: "profile" })
  getUserProfile(@Payload() data: { userId: string }) {
    return this.appService.getUserProfile(data.userId);
  }

  @Post("incomes")
  createIncome(@Payload() data: { userId: string; amount: number }) {
    return this.appService.createIncome(data.userId, data.amount);
  }

  @Post("expenses")
  createExpense(@Payload() data: { userId: string; amount: number }) {
    return this.appService.createExpense(data.userId, data.amount);
  }


  // Other API Gateway methods...

}

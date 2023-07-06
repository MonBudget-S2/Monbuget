import {Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";
import {
  AuthenticationRequired,
  HasRole,
} from "./authentication/authentication.decorator";
import { Role } from "./authentication/authentication.enum";
import { CreateUserDto } from "./users/user.request";

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
}

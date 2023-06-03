import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UseFilters,
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  public constructor(public readonly usersServices: UsersService) {}

  @Post("register")
  async register(@Body() body: unknown) {
    // Forward the request to the user microservice's register endpoint
    return this.usersServices.register(body);
  }

  @Post("login")
  async login(@Body() body: unknown) {
    // Forward the request to the user microservice's login endpoint
    return this.usersServices.login(body);
  }
}

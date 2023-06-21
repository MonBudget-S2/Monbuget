import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Delete,
  Param,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./user.request";
import {
  AuthenticationRequired,
  CurrentUser,
  HasRole,
} from "src/authentication/authentication.decorator";
import { Role } from "src/authentication/authentication.enum";

@AuthenticationRequired()
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }

  @HasRole(Role.ADMIN)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  @HasRole(Role.ADMIN)
  getUserById(@Param("id") id: string, @CurrentUser() user: any) {
    // console.log("user test", user);
    return this.userService.getUserById(id, user);
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}

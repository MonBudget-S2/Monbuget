import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Delete,
  Param,
  Patch,
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
  getUserById(@Param("id") id: string, @CurrentUser() user: any) {
    // console.log("user test", user);
    return this.userService.getUserById(id, user);
  }

  @Put(":id")
  updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: any
  ) {
    return this.userService.updateUser(id, updateUserDto, user);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string, @CurrentUser() user: any) {
    return this.userService.deleteUser(id, user);
  }

  @Patch("change-password")
  updatePassword(
    @Body() body: { oldPassword: string; newPassword: string },
    @CurrentUser() user: any
  ) {
    console.log("user test", user);
    return this.userService.updatePassword(
      body.oldPassword,
      body.newPassword,
      user
    );
  }
}

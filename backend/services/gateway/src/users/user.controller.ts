import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Delete,
  Patch,
  Param, UseInterceptors, UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./user.request";
import {
  AuthenticationRequired,
  CurrentUser,
  HasRole,
} from "src/authentication/authentication.decorator";
import { Role } from "src/authentication/authentication.enum";
import {FileInterceptor} from "@nestjs/platform-express";
import { Express } from 'express';
import { extname } from 'path';
import {diskStorage} from "multer";


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

  @Patch("upload/avatar/:id")
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads',
      filename: (req,file,callback) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = extname(file.originalname);
        callback(null, `${uniqueSuffix}${extension}`);
      },
    })}))
  uploadUserAvatar(@Param("id") id: string, @UploadedFile() file : Express.Multer.File,@CurrentUser() user: any){
    return this.userService.uploadUserAvatar(id, file.filename, user);
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
}

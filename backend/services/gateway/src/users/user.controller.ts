import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Delete,
  Patch,
  Param, UseInterceptors, UploadedFile, Res, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,
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
import {of} from "rxjs";
import { join } from 'path';
import * as process from "process";
import { Response } from 'express';




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
  uploadUserAvatar(@Param("id") id: string, @UploadedFile(
      new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({ maxSize:10000 })
        ]
      })
  ) file : Express.Multer.File,@CurrentUser() user: any){
    return this.userService.uploadUserAvatar(id, file.filename, user);
  }

  @Get("profile-image/:avatarUrl")
  getFile(@Param("avatarUrl") avatarUrl: string, @Res() res: Response){
      return of(res.sendFile(join(process.cwd(),'uploads/'+ avatarUrl)));
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

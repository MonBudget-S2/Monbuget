import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

import { Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  //   @UseGuards(AuthGuard('jwt'))
  @MessagePattern({ service: 'auth', cmd: 'login' })
  async login(@Body() loginUserDto: LoginUserDto) {
    Logger.log('Login request', '***********AuthController***********');
    const user = await this.usersService.findByUsername(loginUserDto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.authService.login(
      loginUserDto.username,
      loginUserDto.password,
      user,
    );
  }

  // @MessagePattern({ service: 'auth', cmd: 'login' })
  // async login(data: any): Promise<any> {
  //   return await this.authService.login(data.username, data.password);
  // }

  @MessagePattern({ service: 'auth', cmd: 'register' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
}

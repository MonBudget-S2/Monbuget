import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.register(createUserDto);
  // }

  @MessagePattern({ service: 'user', cmd: 'getUsers' })
  async getUsers() {
    Logger.log('Get users request', '***********UsersController***********');
    return this.usersService.findAll();
  }
}

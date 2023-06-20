import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ service: 'user', cmd: 'getUsers' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ service: 'user', cmd: 'getUserById' })
  async getUserById(id: string) {
    return this.usersService.getUserById(id);
  }

  @MessagePattern({ service: 'user', cmd: 'getUserByUsername' })
  async getUserByUsername(username: string) {
    return this.usersService.getUserByUsername(username);
  }

}

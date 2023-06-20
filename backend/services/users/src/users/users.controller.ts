import { Controller, Post, Body, UseGuards, Logger, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateUserDto } from './user.request';

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

  @MessagePattern({ service: 'user', action: 'update' })
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @MessagePattern({ service: 'user', action: 'delete' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

}

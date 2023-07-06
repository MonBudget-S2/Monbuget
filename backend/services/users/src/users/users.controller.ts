import {
  Controller,
  Post,
  Body,
  UseGuards,
  Logger,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateUserDto } from './user.request';
import { RemoveFieldsInterceptor } from './interceptors/remove-fields.interceptor';

@Controller()
@UseInterceptors(new RemoveFieldsInterceptor(['password']))
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

  @MessagePattern({ service: 'user', cmd: 'update' })
  updateUser(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    console.log('updateUser', payload);
    const { id, updateUserDto } = payload;
    return this.usersService.updateUser(id, updateUserDto);
  }

  @MessagePattern({ service: 'user', cmd: 'delete' })
  deleteUser(@Payload() id: string) {
    return this.usersService.deleteUser(id);
  }

  @MessagePattern({service:'user', cmd:'uploadAvatar'})
  uploadUserAvatar(@Payload() payload: {id: string; avatarUrl:string}) {
    console.log('uploadImage', payload);
    const {id, avatarUrl} = payload;
    return this.usersService.uploadUserAvatar(id, avatarUrl);
  }


  @MessagePattern({ service: 'user', cmd: 'updatePassword' })
  updatePassword(
    @Param('id') id: string,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    console.log('updatePassword', body);
    const { oldPassword, newPassword } = body;
    return this.usersService.updatePassword(id, oldPassword, newPassword);
  }

  @MessagePattern({ service:'user', cmd:'verifyUser'})
  verifyUser(@Param('id') id:string){
    return this.usersService.verifyUser(id);
  }
}

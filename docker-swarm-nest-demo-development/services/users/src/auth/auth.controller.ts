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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  //   @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByUsername(loginUserDto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.authService.login(
      loginUserDto.username,
      loginUserDto.password,
      user,
    );
  }
}

import { Body, Controller, Logger, ValidationPipe } from '@nestjs/common';
import { LoginRequest, TokenValidateRequest } from './authentication.request';
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/users/users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/user.request';

@Controller()
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UsersService,
  ) {}

  @MessagePattern({ service: 'auth', cmd: 'login' })
  public login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    Logger.log('Auth Login request', '***********Auth***********');

    return this.authenticationService.login(loginRequest);
  }

  // @MessagePattern({ service: 'auth', cmd: 'validateToken' })
  // public validateToken(
  //   @Body(ValidationPipe) tokenValidateRequest: TokenValidateRequest,
  // ) {
  //   Logger.log("ValidateToken request", "***********Auth***********");
  //   return this.authenticationService.validateToken(tokenValidateRequest);
  // }
  @MessagePattern({ service: 'auth', cmd: 'validateToken' })
  public validateToken(tokenValidateRequest: TokenValidateRequest) {
    Logger.log('ValidateToken request', '***********Auth***********');
    return this.authenticationService.validateToken(tokenValidateRequest);
  }

  @MessagePattern({ service: 'auth', cmd: 'register' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @MessagePattern({ service: 'user', cmd: 'createAdvisor' })
  createAdvisor(@Payload() createUserDto: CreateUserDto) {
    console.log('createAdvisor request', '***********Auth***********');
    return this.userService.createAdvisor(createUserDto);
  }
}

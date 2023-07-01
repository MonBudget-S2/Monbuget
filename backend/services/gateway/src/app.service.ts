import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateUserDto } from "./users/user.request";

@Injectable()
export class AppService {
  // private readonly authService: ClientProxy;
  // private readonly userService: ClientProxy;
  // private readonly incomeService: ClientProxy;

  // constructor() {
  //   this.authService = ClientProxyFactory.create({ transport: Transport.TCP });
  //   this.userService = ClientProxyFactory.create({ transport: Transport.TCP });
  //   this.incomeService = ClientProxyFactory.create({
  //     transport: Transport.TCP,
  //   });
  // }

  constructor(
    @Inject("USER_SERVICE") private readonly authService: ClientProxy,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy,
  ) // @Inject("BUDGET_SERVICE") private readonly budgetService: ClientProxy

  {}

  async login(data: { username: string; password: string }) {
    Logger.log("Login request", "***********AppService***********");
    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "login" }, data)
    );
  }

  async validateToken(token: string) {
    const data = { token: token };

    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "validateToken" }, data)
    );
  }

  async register(createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "register" }, createUserDto)
    );
  }

  // Other API Gateway methods...
}

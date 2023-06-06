import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

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
    @Inject("INCOME_SERVICE") private readonly incomeService: ClientProxy
  ) {}

  async login(data: { username: string; password: string }) {
    Logger.log("Login request", "***********AppService***********");
    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "login" }, data)
    );
  }

  async register(data: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    return await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "register" }, data)
    );
  }

  async getUsers() {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "getUsers" }, {})
    );
  }

  async getUserProfile(userId: string) {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "getUserProfile" }, userId)
    );
  }

  async createIncome(userId: string, amount: number) {
    return await firstValueFrom(
      this.incomeService.send(
        { service: "income", cmd: "create" },
        { userId, amount }
      )
    );
  }

  async createExpense(userId: string, amount: number) {
    return await firstValueFrom(
      this.incomeService.send(
        { service: "expense", cmd: "create" },
        { userId, amount }
      )
    );

  // Other API Gateway methods...
}

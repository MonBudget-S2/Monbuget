import {Inject, Injectable, Logger, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateUserDto } from "./users/user.request";
import {MailService} from "./mail/mail.service";
import {JwtService} from "@nestjs/jwt";
import {UserService as userServ} from "./users/user.service";

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
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userServ: userServ,
  ) // @Inject("BUDGET_SERVICE") private readonly budgetService: ClientProxy

  {}

  private createToken(payload){
      return this.jwtService.sign(payload);
  }

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
    const res =  await firstValueFrom(
      this.userService.send({ service: "auth", cmd: "register" }, createUserDto)
    );
    if (res.message =="User registered successfully")
    {
        const payload = {
          username: createUserDto.username
        };
        const token = this.createToken(payload);

        await this.mailService.sendUserConfirmation(createUserDto.username,createUserDto.email,token);
    }
    return res;
  }

  async confirmEmailAddress(token:string){
    try {
      const result = await this.jwtService.verify(token);
      if (typeof result !== "object" || !result.username || typeof result.username !== "string")
      {
        throw new UnauthorizedException('invalid token')
      }
      const user = await this.userServ.getUserByUsername(result.username);
      if (user){
        return this.userServ.verifyUser(user.id);
      }
      else {
        throw new UnauthorizedException('invalid token')
      }

    }
    catch (e)
    {
      throw new NotFoundException('Erreur de url');
    }


  }

  // Other API Gateway methods...
}

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateUserDto, UpdateUserDto } from "./user.request";
import { Role } from "src/authentication/authentication.enum";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "create" },
        { user: createUserDto }
      )
    );
  }
  async getAllUsers() {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "getUsers" }, {})
    );
  }

  async getUserById(id: string, user: any) {
    console.log("user test", user);
    console.log("id test", id);
    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "getUserById" }, id)
    );
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "update" },
        { id, user: updateUserDto }
      )
    );
  }

  async deleteUser(id: string) {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "delete" }, id)
    );
  }
}

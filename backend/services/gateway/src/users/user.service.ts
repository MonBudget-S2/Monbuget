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

  async updateUser(id: string, updateUserDto: UpdateUserDto, user: any) {
    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }

    return await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "update" },
        { id, updateUserDto }
      )
    );
  }

  async deleteUser(id: string, user: any) {
    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "delete" }, id)
    );
  }

  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
    user: any
  ) {
    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new HttpException(
        "You are not authorized to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    return await firstValueFrom(
      this.userService.send(
        { service: "user", cmd: "updatePassword" },
        { id, oldPassword, newPassword }
      )
    );
  }
}

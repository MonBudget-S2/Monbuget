import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateUserDto, UpdateUserDto } from "./user.request";

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
      this.userService.send({ service: "user", cmd: "getAll" }, {})
    );
  }

  async getUserById(id: string) {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "getById" }, { id })
    );
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "update" }, { id, user: updateUserDto })
    );
  }

  async deleteUser(id: string) {
    return await firstValueFrom(
      this.userService.send({ service: "user", cmd: "delete" }, { id })
    );
  }
}


import {Injectable, Module} from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MulterModule } from "@nestjs/platform-express";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-users-service",
          port: 3002,
        },
      },
    ]),
    MulterModule.register({dest:'./uploads'}),
      JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

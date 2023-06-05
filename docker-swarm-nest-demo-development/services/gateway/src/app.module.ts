import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "auth-service",
          port: 3001,
        },
      },
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-users-service",
          port: 3002,
        },
      },
      {
        name: "INCOME_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-incomes-service",
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

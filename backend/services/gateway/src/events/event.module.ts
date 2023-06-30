import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { AuthenticationModule } from "src/authentication/authentication.module";

@Module({
  imports: [
    AuthenticationModule,
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
    ClientsModule.register([
      {
        name: "EVENT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-events-service",
          port: 3009,
        },
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}

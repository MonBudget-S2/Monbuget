import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { DebtController } from "./debt.controller";
import { DebtService } from "./debt.service";
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
        name: "DEBT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-debts-service",
          port: 3008,
        },
      },
    ]),
  ],
  controllers: [DebtController],
  providers: [DebtService],
})
export class DebtModule {}

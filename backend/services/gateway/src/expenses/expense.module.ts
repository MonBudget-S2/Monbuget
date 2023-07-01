import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
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
        name: "EXPENSE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-expenses-service",
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
